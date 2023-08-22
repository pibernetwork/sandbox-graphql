import { Document, Filter, ObjectId, WithId } from 'mongodb';

// Repository
export interface MongoDbRepositoryFindOptions<T> {
  skip: number;
  limit: number;
  sortDirection: -1 | 1;
  sortBy: keyof T;
  filter: Filter<T>;
}

export interface MongoDbRepositoryInterface<T extends Document> {
  deleteOne(documentId: string): Promise<boolean>;
  updateOne(
    documentId: string,
    documentToUpdate: T | WithId<T>
  ): Promise<WithId<T>>;
  insertOne(documentToInsert: T): Promise<WithId<T>>;
  insertMany(documents: T[]): Promise<ObjectId[]>;

  findOne(documentId: string): Promise<WithId<T> | null>;
  findAll(): Promise<WithId<T>[]>;
  findAllConnection(
    options: MongoDbRepositoryFindOptions<T>
  ): Promise<WithId<T>[]>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findAllFilter(filter: Filter<T>): Promise<WithId<T>[]>;
}

// Services
export type MongoDbFieldError<T> = {
  key: keyof T;
  message: string;
  type: string;
};

export type MongoDbServiceReturn<T> = { node: WithId<T> | null } & {
  errors: MongoDbFieldError<T>[];
};

// export interface Node<T> {
//   node: T | null;
//   errors: MongoDbFieldError<T>[];
// }

export interface MongoDbServiceInterface<T extends Document> {
  deleteOne(documentId: string): Promise<boolean>;
  insertOne(documentToInsert: T): Promise<MongoDbServiceReturn<T>>;
  insertMany(documents: T[]): Promise<ObjectId[]>;
  updateOne(
    documentId: string,
    documentToUpdate: T | WithId<T>
  ): Promise<MongoDbServiceReturn<T>>;
  findAll(): Promise<WithId<T>[]>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findAllConnection(
    options: MongoDbServiceFindOptions<T>
  ): Promise<WithId<T>[]>;
  findOne(documentId: string): Promise<WithId<T> | null>;
  findAllByReference(refKey: string, refId: ObjectId): Promise<WithId<T>[]>;
}

export interface MongoDbServiceFindOptions<T> {
  page: number;
  perPage: number;
  sortDirection: 'asc' | 'desc';
  sortBy: keyof T;
  filter: { [key in keyof Partial<T>]: unknown };
}
