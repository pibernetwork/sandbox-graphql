import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`

  type User {
    _id String,
    email String,
    birthday String
  }

  type Query {
    users: [User]
  }
`;

export const resolvers: Resolvers = {
  Query: {
    users: () => [{ email: 'haha@gmail.com', birthday: '1234' }]
  }
};
