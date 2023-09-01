// sum.test.js
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { Connection, ObjectId, ProfileWithId, UserWithId } from 'library';

import { ProfileService, UserService } from 'library';
import { assert, expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Profile } from '../../resolvers-types.js';
import { resolvers, typeDefs } from './../../graphql/index.js';
import { GraphQLContext } from './../../graphql/types.js';

test('Query Profiles', async () => {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs
  });

  const users = mock<UserService>();

  const profiles = mock<ProfileService>();

  const connection = mock<Connection>();

  const contextValue: GraphQLContext = {
    connection,
    users,
    profiles,
    user: null
  };

  profiles.findAll.mockReturnValue(Promise.resolve([]));

  const GET_QUERY = gql.default`
    query {
      profiles {
        _id
      }
    }
  `;

  const response = await server.executeOperation(
    {
      query: GET_QUERY
    },
    {
      contextValue
    }
  );

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.['profiles']).toEqual([]);
});

test('Query Profiles Connection', async () => {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs
  });

  const users = mock<UserService>();

  const profiles = mock<ProfileService>();

  const connection = mock<Connection>();

  const contextValue: GraphQLContext = {
    connection,
    users,
    profiles,
    user: null
  };

  profiles.findAllConnection.mockResolvedValue({
    nodes: [],
    pageInfo: {
      page: 1,
      nextPage: 2,
      prevPage: null,
      hasNextPage: true,
      hasPrevPage: false,
      totalNodes: 0,
      totalPages: 1,
      start: 1,
      end: 2
    }
  });

  const GET_QUERY = gql.default`
    query($page: Int!, $limit: Int!, $sortBy: String!, $sortOrder: String!, $filters: ProfileConnectionFilter!) {
      profilesConnection(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, filters: $filters) {
        nodes {
          _id
        }
      }
    }
  `;

  const response = await server.executeOperation(
    {
      query: GET_QUERY,
      variables: {
        page: 1,
        limit: 10,
        sortBy: 'user.email',
        sortOrder: 'asc',
        filters: {}
      }
    },
    {
      contextValue
    }
  );

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.['profilesConnection']).toEqual({
    nodes: []
  });

  expect(profiles.findAllConnection).toBeCalled();
});

test('Query Profile', async () => {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs
  });

  const users = mock<UserService>();

  const profiles = mock<ProfileService>();

  const connection = mock<Connection>();

  const contextValue: GraphQLContext = {
    connection,
    users,
    profiles,
    user: null
  };

  const profileMock: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    birthday: '12345',
    userId: new ObjectId('343332313433323134333231'),
    weight: 75
  };

  const userMock: UserWithId = {
    _id: new ObjectId('343332313433323134333231'),
    email: 'myemail@gmail.com'
  };

  profiles.findOne.mockReturnValue(Promise.resolve(profileMock));
  users.findOne.mockReturnValue(Promise.resolve(userMock));

  const GET_QUERY = gql.default`
    query GetProfiles($_id: String!) {
      profile(_id: $_id) {
        _id
        birthday
        weight
        user {
          _id
          email
        }
      }
    }
  `;

  const response = await server.executeOperation(
    {
      query: GET_QUERY,
      variables: { _id: '123123123123' }
    },
    {
      contextValue
    }
  );

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();

  const profile = response.body.singleResult.data?.['profile'] as Profile;

  expect(profile.birthday).toEqual(profileMock.birthday);
  expect(profile.weight).toEqual(profileMock.weight);

  expect(profile.user?.email).toEqual(userMock.email);

  expect(profiles.findOne).toBeCalledWith('123123123123');
  expect(users.findOne).toBeCalledWith('343332313433323134333231');
});

test('Mutation - Add Profile - OK', async () => {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs
  });

  const users = mock<UserService>();

  const profiles = mock<ProfileService>();

  const connection = mock<Connection>();

  const contextValue: GraphQLContext = {
    connection,
    users,
    profiles,
    user: null
  };

  const profileMock: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    birthday: '12345',
    userId: new ObjectId('343332313433323134333231'),
    weight: 75
  };

  profiles.insertOne.mockReturnValue(
    Promise.resolve({ node: profileMock, errors: [] })
  );

  const GET_QUERY = gql.default`
    mutation AddProfile($userId: String!, $birthday: String!, $weight: Float!) {
      addProfile(userId: $userId, birthday: $birthday, weight: $weight) {
         _id
      }
    }
  `;

  const response = await server.executeOperation(
    {
      query: GET_QUERY,
      variables: {
        userId: '123123123123',
        birthday: '1950-06-08T03:25:44.443Z',
        weight: 86
      }
    },
    {
      contextValue
    }
  );

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();
});

test('Mutation - Edit Profile - OK', async () => {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs
  });

  const users = mock<UserService>();

  const profiles = mock<ProfileService>();

  const connection = mock<Connection>();

  const contextValue: GraphQLContext = {
    connection,
    users,
    profiles,
    user: null
  };

  const GET_QUERY = gql.default`
  mutation EditProfile($_id: String!, $userId: String!, $birthday: String!, $weight: Float!) {
    editProfile(_id: $_id, userId: $userId, birthday: $birthday, weight: $weight) {
       _id
    }
  }
`;

  const profileMock: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    birthday: '12345',
    userId: new ObjectId('343332313433323134333231'),
    weight: 75
  };

  profiles.updateOne.mockReturnValue(
    Promise.resolve({ node: profileMock, errors: [] })
  );

  const response = await server.executeOperation(
    {
      query: GET_QUERY,
      variables: {
        _id: '123123123123',
        userId: '123123123123',
        birthday: '1950-06-08T03:25:44.443Z',
        weight: 86
      }
    },
    {
      contextValue
    }
  );

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();
});

test('Mutation - Delete Profile - OK', async () => {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs
  });

  const users = mock<UserService>();

  const profiles = mock<ProfileService>();

  const connection = mock<Connection>();

  const contextValue: GraphQLContext = {
    connection,
    users,
    profiles,
    user: null
  };

  const GET_QUERY = gql.default`
  mutation DelProfile($_id: String!) {
    delProfile(_id: $_id)
  }
`;

  profiles.deleteOne.mockResolvedValue(true);

  const response = await server.executeOperation(
    {
      query: GET_QUERY,
      variables: { _id: '123123123123' }
    },
    {
      contextValue
    }
  );

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();

  expect(profiles.deleteOne).toBeCalled();
});
