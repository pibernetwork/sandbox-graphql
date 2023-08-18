import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`

  type User {
    _id: String
    email: String
    birthday: String
  }

  type Query {
    user(_id: String!): User!
    users: [User]
  }
`;

export const resolvers: Resolvers = {
  Query: {
    users: async (_, __, ctx) => {
      const usersDb = await ctx.users.findAll();

      return usersDb.map((user) => {
        return {
          ...user,
          _id: user._id.toString()
        };
      });
    },
    user: async (_, args, ctx) => {
      const { _id } = args;

      const user = await ctx.users.findOne(_id);

      if (!user) {
        throw new Error('Missing user');
      }

      return {
        ...user,
        _id: user._id.toString()
      };
    }
  }
};
