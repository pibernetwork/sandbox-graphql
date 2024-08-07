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
    usersOptions: [SelectOption!]!
  }
`;

export const resolvers: Resolvers = {
  User: {
    profiles: async (user, __, ctx) => {
      const { _id } = user;

      const profiles = await ctx.profiles.findAllByReference('userId', _id);

      return profiles;
    }
  },
  Query: {
    users: async (_, __, ctx) => {
      const usersDb = await ctx.users.findAll();

      return usersDb;
    },
    usersOptions: async (_, __, ctx) => {
      const usersDb = await ctx.users.findAll();

      return usersDb.map((userDb) => ({
        name: userDb.email,
        value: userDb._id.toString()
      }));
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
