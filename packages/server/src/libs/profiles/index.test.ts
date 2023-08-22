// sum.test.js
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { Connection, ObjectId } from 'library';
import ProfileService from 'library/src/services/profiles/service.js';
import UserService from 'library/src/services/users/service.js';
import { assert, expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Profile } from '../../resolvers-types.js';
import { resolvers, typeDefs } from './../../graphql/index.js';
import { GraphQLContext } from './../../graphql/types.js';

test('Query Profiles', async () => {
  // create a test server to test against, using our production typeDefs,

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

  const profileMock = {
    _id: new ObjectId('123123123123'),
    birthday: '12345',
    userId: new ObjectId('343332313433323134333231')
  };

  const userMock = {
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

  expect(profile.user?.email).toEqual(userMock.email);

  expect(profiles.findOne).toBeCalledWith('123123123123');
  expect(users.findOne).toBeCalledWith('343332313433323134333231');
});