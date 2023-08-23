import { MongoDbServiceFindOptions, ObjectId, Profile } from 'library';
import { Resolvers } from '../../resolvers-types.js';

import gql from 'graphql-tag';

export const typeDefs = gql.default`
  type Profile {
    _id: String
    user: User
    birthday: String
    weight: Float
  }


  input ProfileConnectionFilter {
    birtday: String
    weight: Float
  }

  type Query {
    profiles: [Profile]!
    profilesConnection(page: Int!, limit: Int!, sortBy: String!, sortOrder: String!, filters: ProfileConnectionFilter): [Profile]!
    profile(_id: String!): Profile
  }

  type Mutation {
    addProfile(userId: String!, birthday: String!, weight: Float!): Profile
    editProfile(_id: String!, userId: String!, birthday: String!, weight: Float!): Profile
    delProfile(_id: String!): String!
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
    profilesConnection: async (_, args, ctx) => {
      const options: MongoDbServiceFindOptions<Profile> = {
        page: args.page,
        perPage: args.limit,
        sortBy: args.sortBy as keyof Profile,
        sortDirection: args.sortOrder as 'asc' | 'desc',
        filter: args.filters as { [key in keyof Profile]: unknown }
      };
      const profilesDb = await ctx.profiles.findAllConnection(options);

      return profilesDb.map((profile) => {
        return {
          ...profile,
          userId: profile.userId,
          _id: profile._id
        };
      });
    },
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
    },
    editProfile: async (_, args, ctx) => {
      if (!args.userId) {
        throw new Error('Missing user id');
      }

      const { _id, ...profileArgs } = args;

      const profileItem: Partial<Profile> = {
        ...profileArgs,
        userId: new ObjectId(profileArgs.userId)
      };
      const profile = await ctx.profiles.updateOne(_id, profileItem);

      if (!profile.node) {
        throw new Error('Failed to edit profile');
      }
      return profile.node;
    },
    delProfile: async (_, args, ctx) => {
      const { _id } = args;

      await ctx.profiles.deleteOne(_id);
      return _id;
    }
  }
};
