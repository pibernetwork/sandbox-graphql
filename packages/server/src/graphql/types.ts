import { DataServices } from 'library';
import { User } from '../resolvers-types.js';

type GraphQLServices = ReturnType<DataServices['getAll']>;

export interface GraphQLContext extends GraphQLServices {
  user: User | null;
}
