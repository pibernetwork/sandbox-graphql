import gql from 'graphql-tag';
import { Resolvers } from '../../resolvers-types.js';

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
    generated: () => 'generated'
  }
};

export const typeDefs = gql.default`
  type Query {
    hello: String,
    generated: String,
  }
`;
