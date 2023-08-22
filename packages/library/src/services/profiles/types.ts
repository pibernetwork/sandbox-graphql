import { ObjectId, WithId } from 'mongodb';
import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types.js';

export interface Profile {
  userId: ObjectId;
  birthday: string;
  weight: number;
}

export type ProfileWithId = WithId<Profile>;

export type ProfileRepository = MongoDbRepositoryInterface<Profile>;

export type ProfileService = MongoDbServiceInterface<Profile>;
