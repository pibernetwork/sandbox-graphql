import gql from 'graphql-tag';
export const resolvers = {
    Query: {
        hello: () => 'world',
        generated: () => 'generated'
    }
};
export const typeDefs = gql.default `
  type Query {
    hello: String,
    generated: String,
  }
`;
