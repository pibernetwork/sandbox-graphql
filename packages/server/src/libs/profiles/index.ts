import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`
  type Profile {
    _id: String
    user: User
    birthday: String
  }

  type Query {
    profiles: [Profile]
    profile(_id: String): Profile
  }
`;

export const resolvers: Resolvers = {
  Profile: {
    user: async (profile, __, ctx) => {
      const { userId } = profile;

      if (!userId) {
        throw new Error('Missing user ID');
      }

      const user = await ctx.users.findOne(userId.toString());

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }
  },
  Query: {
    profiles: async (_, __, ctx) => {
      const profilesDb = await ctx.profiles.findAll();

      return profilesDb.map((profile) => {
        return {
          ...profile,
          userId: profile.userId.toString(),
          _id: profile._id.toString()
        };
      });
    }
  }
};
