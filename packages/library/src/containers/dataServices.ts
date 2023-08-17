import { Container } from 'inversify';
import ProfileService from '../services/profiles/service.js';
import UserService from '../services/users/service.js';
import { Connection } from '../utils/types.js';
import { TYPES } from './types.js';

class DataServices {
  connection: Connection;
  users: UserService;
  profiles: ProfileService;

  constructor(container: Container) {
    this.connection = container.get(TYPES.MongoDbConnection);
    this.users = container.get(TYPES.UserService);
    this.profiles = container.get(TYPES.ProfileService);
  }

  getAll() {
    return {
      users: this.users,
      connection: this.connection,
      profiles: this.profiles
    };
  }
}

export default DataServices;
