import gql from 'graphql-tag';

export const typeDefs = gql.default`
  type Query {
    hello: String,
    generated: String,
  }
`;
