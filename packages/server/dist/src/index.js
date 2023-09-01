import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { container, DataServices } from 'library/src/index.js';
import { resolvers, typeDefs } from './graphql/index.js';
dotenv.config();
const { json } = bodyParser;
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true
});
await server.start();
const dataServices = new DataServices(container);
await dataServices.connection.init();
app.get('/', (_, res) => {
    res.status(301).redirect('/graphql');
});
app.use('/graphql', cors(), json(), expressMiddleware(server, {
    context: async () => {
        const services = dataServices.getAll();
        return {
            user: null,
            ...services
        };
    }
}));
export default httpServer;
