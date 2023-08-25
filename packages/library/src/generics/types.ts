import { Document, Filter, ObjectId, WithId } from 'mongodb';

// Services
export type MongoDbFieldError<T> = {
  key: keyof T;
  message: string;
  type: string;
};

export type MongoDbServiceReturn<T> = { node: WithId<T> | null } & {
  errors: MongoDbFieldError<T>[];
};

export interface MongoDbServiceConnectionPageInfo {
  page: number;
  start: number;
  end: number;
  nextPage: number | null;
  prevPage: number | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalNodes: number;
  totalPages: number;
}

export interface MongoDbServiceConnection<T> {
  nodes: T[];
  pageInfo: MongoDbServiceConnectionPageInfo;
}

export interface MongoDbServiceInterface<T extends Document> {
  deleteOne(documentId: string): Promise<boolean>;
  insertOne(documentToInsert: T): Promise<MongoDbServiceReturn<T>>;
  insertMany(documents: T[]): Promise<ObjectId[]>;
  updateOne(
    documentId: string,
    documentToUpdate: Partial<T | WithId<T>>
  ): Promise<MongoDbServiceReturn<T>>;
  findAll(): Promise<WithId<T>[]>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findAllConnection(
    options: MongoDbServiceFindOptions<T>
  ): Promise<MongoDbServiceConnection<WithId<T>>>;
  findOne(documentId: string): Promise<WithId<T> | null>;
  findAllByReference(refKey: string, refId: ObjectId): Promise<WithId<T>[]>;
}

// export interface Node<T> {
//   node: T | null;
//   errors: MongoDbFieldError<T>[];
// }

export interface FieldFilter {
  between?: {
    from?: unknown;
    to?: unknown;
  };
}

export interface MongoDbServiceFindOptions<T> {
  page: number;
  perPage: number;
  sortDirection: 'asc' | 'desc';
  sortBy: keyof T;
  filter: { [key in keyof Partial<T>]?: FieldFilter };
}

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

  findAllConnectionCount(filters: Filter<T>): Promise<number>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findAllFilter(filter: Filter<T>): Promise<WithId<T>[]>;
}
