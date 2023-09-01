import { DataServices } from 'library/src/index.js';
import { User } from '../resolvers-types.js';

type GraphQLServices = ReturnType<DataServices['getAll']>;

export interface GraphQLContext extends GraphQLServices {
  user: User | null;
}
