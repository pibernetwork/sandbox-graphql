import { WithId } from 'mongodb';
import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types.js';

export interface User {
  email: string;
}

export type UserWithId = WithId<User>;

export type UserRepository = MongoDbRepositoryInterface<User>;

export type UserService = MongoDbServiceInterface<User>;
