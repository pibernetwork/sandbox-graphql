import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  generates: {
    './src/resolvers-types.ts': {
      config: {
        useIndexSignature: true
      },
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
};
export default config;
