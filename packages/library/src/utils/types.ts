import { Collection, Document, MongoClient } from "mongodb";

export interface Connection {
  init: () => Promise<void>;
  getClient: () => Promise<MongoClient>;
  close: () => Promise<void>;
  getCollection<T extends Document>(
    collectionName: string
  ): Promise<Collection<T>>;
}
