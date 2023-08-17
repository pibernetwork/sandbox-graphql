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
  find(options: MongoDbRepositoryFindOptions<T>): Promise<WithId<T>[]>;
  findOne(documentId: string): Promise<WithId<T> | null>;
  findAll(): Promise<WithId<T>[]>;
  queryAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
}

// Services
export type MongoDbFieldError<T> = {
  key: keyof T;
  message: string;
  type: string;
};

export type MongoDbServiceReturn<T> = { node: T | WithId<T> | null } & {
  errors: MongoDbFieldError<T>[];
};

// export interface Node<T> {
//   node: T | null;
//   errors: MongoDbFieldError<T>[];
// }

export interface MongoDbServiceInterface<T extends Document> {
  deleteOne(documentId: string): Promise<boolean>;
  insertOne(documentToInsert: T): Promise<MongoDbServiceReturn<T>>;
  updateOne(
    documentId: string,
    documentToUpdate: T | WithId<T>
  ): Promise<MongoDbServiceReturn<T>>;
  findAll(): Promise<WithId<T>[]>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findByIds(
    ids: readonly ObjectId[],
    options: MongoDbServiceFindOptions<T>
  ): Promise<WithId<T>[]>;
  find(options: MongoDbServiceFindOptions<T>): Promise<WithId<T>[]>;
  findOne(documentId: string): Promise<WithId<T> | null>;
}

export interface MongoDbServiceFindOptions<T> {
  page: number;
  perPage: number;
  sortDirection: 'asc' | 'desc';
  sortBy: keyof T;
  filter: { [key in keyof Partial<T>]: unknown };
}
