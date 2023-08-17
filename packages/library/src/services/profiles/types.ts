import {
  MongoDbRepositoryInterface,
  MongoDbServiceInterface
} from '../../generics/types.js';

export interface Profile {
  _id?: string;
  userId: string;
  birthday: string;
}

export type ProfileRepository = MongoDbRepositoryInterface<Profile>;

export type ProfileService = MongoDbServiceInterface<Profile>;
