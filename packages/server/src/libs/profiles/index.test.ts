// sum.test.js
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { Connection, ObjectId, ProfileWithId, UserWithId } from 'library';
import ProfileService from 'library/src/services/profiles/service.js';
import UserService from 'library/src/services/users/service.js';
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
    query {
      profile(_id: "123123123123") {
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
      query: GET_QUERY
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
    mutation {
      addProfile(userId: "123123123123", birthday: "1950-06-08T03:25:44.443Z", weight: 86) {

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
  mutation {
    editProfile(_id: "123123123123", userId: "123123123123", birthday: "1950-06-08T03:25:44.443Z", weight: 86) {
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
      query: GET_QUERY
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
  mutation {
    delProfile(_id: "123123123123")
  }
`;

  profiles.deleteOne.mockResolvedValue(true);

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

  expect(profiles.deleteOne).toBeCalled();
});
