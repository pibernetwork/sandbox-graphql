import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  generates: {
    './src/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        contextType: './graphql/types.js#GraphQLContext',
        mappers: {
          Profile: 'library#ProfileWithId',
          User: 'library#UserWithId'
        }
      },
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
};
export default config;
