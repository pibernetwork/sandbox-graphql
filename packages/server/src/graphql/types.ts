import DataServices from 'library/src/containers/dataServices.js';
import { User } from '../resolvers-types.js';

type GraphQLServices = ReturnType<DataServices['getAll']>;

export interface GraphQLContext extends GraphQLServices {
  user: User | null;
}
