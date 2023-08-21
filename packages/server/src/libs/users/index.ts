import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`

  type User {
    _id: String!
    email: String
    birthday: String
    profiles: [Profile]!
  }

  type Query {
    user(_id: String!): User!
    users: [User]
  }
`;

export const resolvers: Resolvers = {
  User: {
    profiles: async (user, __, ctx) => {
      const { _id } = user;

      const profiles = await ctx.profiles.findByReference(
        'userId',
        _id.toString()
      );

      return profiles;
    }
  },
  Query: {
    users: async (_, __, ctx) => {
      const usersDb = await ctx.users.findAll();

      return usersDb;
    },
    user: async (_, args, ctx) => {
      const { _id } = args;

      const user = await ctx.users.findOne(_id);

      if (!user) {
        throw new Error('Missing user');
      }

      return user;
    }
  }
};
