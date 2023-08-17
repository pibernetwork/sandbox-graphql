import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types';

export interface User {
  _id?: string;
  email: string;
}

export type UserRepository = MongoDbRepositoryInterface<User>;

export type UserService = MongoDbServiceInterface<User>;
