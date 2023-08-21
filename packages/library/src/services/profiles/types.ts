import { ObjectId } from 'mongodb';
import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types.js';

export interface Profile {
  userId: string;
  birthday: string;
}

export interface ProfileDb extends Omit<Profile, 'userId'> {
  _id: ObjectId;
  userId: ObjectId;
}

export type ProfileRepository = MongoDbRepositoryInterface<Profile>;

export type ProfileService = MongoDbServiceInterface<Profile>;
