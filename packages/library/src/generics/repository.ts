import {
  Collection,
  Document,
  Filter,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId
} from 'mongodb';

import { inject, injectable } from 'inversify';

import { TYPES } from '../containers/types.js';
import { Connection } from '../utils/types.js';
import {
  MongoDbRepositoryFindOptions,
  MongoDbRepositoryInterface
} from './types.js';

@injectable()
abstract class GenericRepository<T extends Document>
  implements MongoDbRepositoryInterface<T>
{
  private _connection: Connection;
  collectionName: string | null = null;

  constructor(@inject(TYPES.MongoDbConnection) connection: Connection) {
    this._connection = connection;
  }

  async getCollection(collectionName: string | null): Promise<Collection<T>> {
    if (collectionName === null) {
      throw new Error('Missing collection name');
    }
    return this._connection.getCollection<T>(collectionName);
  }

  async deleteOne(documentId: string) {
    const currentMessage = await this.findOne(documentId);

    if (!currentMessage) {
      throw new Error('Message not found');
    }

    const collection = await this.getCollection(this.collectionName);

    await collection.deleteOne({
      _id: new ObjectId(documentId)
    } as unknown as Filter<T>);

    return true;
  }

  async updateOne(documentId: string, documentToUpdate: T): Promise<WithId<T>> {
    const currentMessage = await this.findOne(documentId);

    if (!currentMessage) {
      throw new Error('Message not found');
    }

    const newMessage: WithId<T> = { ...currentMessage, ...documentToUpdate };

    const collection = await this.getCollection(this.collectionName);

    //const document =
    await collection.updateOne(
      { _id: { $eq: new ObjectId(documentId) } } as unknown as Filter<T>,
      { $set: newMessage } as unknown as Readonly<Partial<T>>
    );

    return newMessage;
  }

  async insertOne(documentToInsert: T): Promise<WithId<T>> {
    const collection = await this.getCollection(this.collectionName);

    const document = await collection.insertOne(
      documentToInsert as unknown as OptionalUnlessRequiredId<T>
    );

    const id = document.insertedId.toString();

    return {
      ...documentToInsert,
      _id: id
    } as unknown as WithId<T>;
  }

  async insertMany(documents: T[]): Promise<ObjectId[]> {
    const collection = await this.getCollection(this.collectionName);

    const document = await collection.insertMany(
      documents as unknown as OptionalUnlessRequiredId<T>[]
    );

    if (!document.acknowledged) {
      throw new Error('Error in insert many');
    }

    const ids = Object.values(document.insertedIds);

    return ids;
  }

  async find(options: MongoDbRepositoryFindOptions<T>): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    const { sortBy, sortDirection, skip, limit, filter } = options;

    return collection
      .find(filter || {})
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortDirection })
      .toArray();
  }

  async findWithFilter(filter: Filter<T>): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    return collection.find(filter).toArray();
  }

  async findAll(): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    return collection.find({}).toArray();
  }

  async findOne(documentId: string): Promise<WithId<T> | null> {
    const collection = await this.getCollection(this.collectionName);

    const messages = collection.findOne({
      _id: { $eq: new ObjectId(documentId) } as unknown as Filter<T>
    });

    return messages || null;
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    return await collection
      .find({
        _id: { $in: ids } as Filter<T>
      })

      .toArray();
  }
}

export default GenericRepository;
