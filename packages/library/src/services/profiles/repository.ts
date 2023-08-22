import { injectable } from 'inversify';
import GenericRepository from '../../generics/repository.js';
import { ProfileDb } from './types.js';

@injectable()
class ProfileRepository extends GenericRepository<ProfileDb> {
  override collectionName: string | null = 'profile';
}

export default ProfileRepository;
