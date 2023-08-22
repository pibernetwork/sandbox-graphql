import DataLoader from 'dataloader';
import { injectable } from 'inversify';
import { Document, Filter, ObjectId, WithId } from 'mongodb';
import { z } from 'zod';
import { extractValidationMessages } from '../utils/validation.js';
import {
  MongoDbRepositoryInterface,
  MongoDbServiceFindOptions,
  MongoDbServiceInterface,
  MongoDbServiceReturn
} from './types.js';

@injectable()
abstract class Service<T extends Document>
  implements MongoDbServiceInterface<T>
{
  private _repository: MongoDbRepositoryInterface<T>;

  constructor(_repository: MongoDbRepositoryInterface<T>) {
    this._repository = _repository;
  }

  // find one

  async findOne(documentId: string) {
    return this._repository.findOne(documentId);
  }

  // find all

  async findAllConnection(options: MongoDbServiceFindOptions<T>) {
    const { page, perPage, sortBy, sortDirection /*, filter */ } = options;

    const skip = (page - 1) * perPage;
    const limit = perPage;

    const direction = sortDirection === 'asc' ? 1 : -1;

    const queryFilter: Filter<T> = {};

    // if (filter.type && typeof filter.type === 'string') {
    //   queryFilter['type'] = { $eq: filter.type };
    // }

    // if (filter.amount && typeof filter.amount === 'string') {
    //   const entries = filter.amount.split(',');
    //   if (entries.length === 1) {
    //     queryFilter['amount'] = { $eq: parseInt(filter.amount) };
    //   }
    //   if (entries.length > 1) {
    //     const min = (entries[0] && parseInt(entries[0])) || 0;
    //     const max = (entries[1] && parseInt(entries[1])) || 0;

    //     queryFilter['amount'] = { $gte: min, $lte: max };
    //   }
    // }

    const documents = await this._repository.findAllConnection({
      skip,
      limit: limit,
      sortBy: sortBy as keyof T,
      sortDirection: direction,
      filter: queryFilter
    });

    return documents;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findAllByIds(ids: readonly ObjectId[]) {
    return this._repository.findAllByIds(ids);
  }

  async findAllByReference(refKey: string, refId: ObjectId) {
    return this._repository.findAllFilter({
      [refKey]: { $eq: refId }
    } as unknown as Filter<T>);
  }

  // insert
  async insertOne(documentToInsert: T): Promise<MongoDbServiceReturn<T>> {
    try {
      this.parseValidation(documentToInsert);

      const node = await this._repository.insertOne(documentToInsert);
      return {
        node,
        errors: []
      };
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errors = extractValidationMessages<T>(e);

        return {
          node: null,
          errors
        };
      }

      throw e;
    }
  }

  async insertMany(documents: T[]): Promise<ObjectId[]> {
    const ids = await this._repository.insertMany(documents);
    return ids;
  }

  // update

  async updateOne(
    documentId: string,
    documentToUpdate: T
  ): Promise<MongoDbServiceReturn<T>> {
    try {
      this.parseValidation(documentToUpdate);
      const node = await this._repository.updateOne(
        documentId,
        documentToUpdate
      );
      return {
        node,
        errors: []
      };
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errors = extractValidationMessages<T>(e);

        return {
          node: null,
          errors
        };
      }

      throw e;
    }
  }

  // delete

  async deleteOne(documentId: string) {
    return this._repository.deleteOne(documentId);
  }

  // utils

  getRepository() {
    return this._repository;
  }

  getDocumentSchema(): z.ZodType<T> {
    throw new Error('Calling a method from abstract class');
  }

  parseValidation(documentToValidate: T) {
    this.getDocumentSchema().parse(documentToValidate);
  }

  documentsToIds(
    _ids: readonly ObjectId[],
    documents: WithId<T>[]
  ): WithId<T>[] {
    return _ids.map((_id) => {
      const documentsDb = documents.find(
        (document: WithId<T>) => document._id.equals(_id) || false
      );

      if (!documentsDb) {
        throw new Error('Graphlql Error on map results to id');
      }
      return documentsDb;
    });
  }

  getLoader() {
    return new DataLoader<ObjectId, WithId<T>>(
      async (keys: readonly ObjectId[]) => {
        const documents = await this.getRepository().findAllByIds(keys);
        return this.documentsToIds(keys, documents);
      }
    );
  }
}

export default Service;
