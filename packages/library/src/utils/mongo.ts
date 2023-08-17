import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { Collection, Document, MongoClient } from 'mongodb';
import { Connection } from './types.js';

dotenv.config();

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  useUnifiedTopology: true
};

@injectable()
class MongoDbConnection implements Connection {
  connectionInstance: MongoClient | null = null;

  async init() {
    if (this.connectionInstance) {
      throw new Error('Trying to init twice');
    }

    const DB_CONNECTION_STRING = process.env['DB_CONNECTION_STRING'];
    if (!DB_CONNECTION_STRING) {
      throw new Error('Missing DB_CONNECTION_STRING');
    }

    const client = new MongoClient(DB_CONNECTION_STRING, config);
    await client.connect();

    this.connectionInstance = client;
  }

  async getCollection<T extends Document>(
    collectionName: string
  ): Promise<Collection<T>> {
    const client = await this.getClient();

    const DB_DATABASE = process.env['DB_DATABASE'];
    if (!DB_DATABASE) {
      throw new Error('Missing DB_DATABASE');
    }

    const db = await client.db(DB_DATABASE);
    return db.collection<T>(collectionName);
  }

  async getClient(): Promise<MongoClient> {
    if (!this.connectionInstance) {
      throw new Error('Missing connection instance');
    }
    return this.connectionInstance;
  }

  async close(): Promise<void> {
    if (!this.connectionInstance) {
      throw new Error('Missing connection instance');
    }

    await this.connectionInstance.close();
  }
}

export default MongoDbConnection;
