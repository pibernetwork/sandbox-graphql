import { ObjectId, Profile } from 'library';
import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`
  type Profile {
    _id: String
    user: User
    birthday: String
    weight: Float
  }

  type Query {
    profiles: [Profile]
    profile(_id: String!): Profile
  }

  type Mutation {
    addProfile(userId: String!, birthday: String!, weight: Float!): Profile
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
          userId: profile.userId,
          _id: profile._id
        };
      });
    },
    profile: async (_, args, ctx) => {
      const { _id } = args;

      const profileDb = await ctx.profiles.findOne(_id);

      if (!profileDb) {
        throw new Error('Missing profile');
      }

      return profileDb;
    }
  },
  Mutation: {
    addProfile: async (_, args, ctx) => {
      if (!args.userId) {
        throw new Error('Missing user id');
      }
      const profileItem: Partial<Profile> = {
        ...args,
        userId: new ObjectId(args.userId)
      };
      const profile = await ctx.profiles.insertOne(profileItem);

      if (!profile.node) {
        throw new Error('Failed to add profile');
      }
      return profile.node;
    }
  }
};
