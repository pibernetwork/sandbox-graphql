import { Container } from 'inversify';
import ProfileRepository from '../services/profiles/repository.js';
import ProfileService from '../services/profiles/service.js';
import UserRepository from '../services/users/repository.js';
import UserService from '../services/users/service.js';
import MongoDbConnection from '../utils/mongo.js';
import { Connection } from '../utils/types.js';
import { TYPES } from './types.js';

const container = new Container();
container
  .bind<Connection>(TYPES.MongoDbConnection)
  .to(MongoDbConnection)
  .inSingletonScope();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<UserService>(TYPES.UserService).to(UserService);

container
  .bind<ProfileRepository>(TYPES.ProfileRepository)
  .to(ProfileRepository);

container.bind<ProfileService>(TYPES.ProfileService).to(ProfileService);

export { container };
