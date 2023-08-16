import { Container } from "inversify";
import MongoDbConnection from "../utils/mongo";
import { Connection } from "../utils/types";
import { TYPES } from "./types";

const container = new Container();
container
  .bind<Connection>(TYPES.MongoDbConnection)
  .to(MongoDbConnection)
  .inSingletonScope();

export { container };
