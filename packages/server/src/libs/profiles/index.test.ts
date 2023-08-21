// sum.test.js
import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import ProfileService from 'library/src/services/profiles/service.js';
import UserService from 'library/src/services/users/service.js';
import { Connection } from 'library/src/utils/types.js';
import { assert, expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
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

  profiles.findOne.mockReturnValue(
    Promise.resolve({ _id: '1234', birthday: '12345', userId: '4321' })
  );

  const GET_QUERY = gql.default`
    query {
      profile(_id: "1234") {
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
