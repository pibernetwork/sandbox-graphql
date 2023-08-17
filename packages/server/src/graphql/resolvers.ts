import { Resolvers } from '../resolvers-types.js';

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
    generated: () => 'string'
  }
};
