import { injectable } from 'inversify';
import GenericRepository from '../../generics/repository.js';
import { Profile } from './types.js';

@injectable()
class ProfileRepository extends GenericRepository<Profile> {
  override collectionName: string | null = 'profile';
}

export default ProfileRepository;
