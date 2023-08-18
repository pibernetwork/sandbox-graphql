import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`

  type Profile {
    _id: String
    user: User
  }

  type Query {
    profiles: [Profile]
  }
`;

export const resolvers: Resolvers = {
  Profile: {
    user: () => {
      return { email: 'haha@gmail.com', birthday: '1234' };
    }
  },
  Query: {
    profiles: () => {
      return [];
    }
  }
};
