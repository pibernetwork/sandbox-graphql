import { ObjectId } from 'mongodb';
import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types.js';

export interface User {
  email: string;
}

export interface UserDb extends User {
  _id: ObjectId;
}

export type UserRepository = MongoDbRepositoryInterface<User>;

export type UserService = MongoDbServiceInterface<User>;
