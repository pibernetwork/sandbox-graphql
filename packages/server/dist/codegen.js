const config = {
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
