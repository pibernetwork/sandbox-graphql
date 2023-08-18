import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import * as profiles from './../libs/profiles/index.js';
import * as starts from './../libs/starts/index.js';
import * as users from './../libs/users/index.js';

export const resolvers = mergeResolvers([
  users.resolvers,
  starts.resolvers,
  profiles.resolvers
]);

export const typeDefs = mergeTypeDefs([
  users.typeDefs,
  starts.typeDefs,
  profiles.typeDefs
]);
