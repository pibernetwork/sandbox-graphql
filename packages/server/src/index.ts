import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import http from 'http';
import DataServices from 'library/src/containers/dataServices.js';
import { container } from 'library/src/containers/inversify.config.js';
import 'reflect-metadata';
import { resolvers, typeDefs } from './graphql/index.js';
import { GraphQLContext } from './graphql/types.js';

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

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async (): Promise<GraphQLContext> => {
      const services = dataServices.getAll();
      return {
        user: null,
        ...services
      };
    }
  })
);

export default httpServer;
