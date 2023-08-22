import { ObjectId } from 'mongodb';
import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types.js';

export interface Profile {
  userId: ObjectId;
  birthday: string;
}

export interface ProfileDb extends Omit<Profile, 'userId'> {
  _id: ObjectId;
  userId: ObjectId;
}

export interface ProfileJson extends Omit<Profile, 'userId'> {
  _id: string;
  userId: string;
}

export type ProfileRepository = MongoDbRepositoryInterface<Profile>;

export type ProfileService = MongoDbServiceInterface<Profile>;