import { injectable } from 'inversify';
import GenericRepository from '../../generics/repository.js';
import { User } from './types.js';

@injectable()
class UserRepository extends GenericRepository<User> {
  override collectionName: string | null = 'user';
}

export default UserRepository;
