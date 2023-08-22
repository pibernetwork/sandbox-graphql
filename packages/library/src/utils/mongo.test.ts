// sum.test.js
import 'reflect-metadata';

import { expect, test } from 'vitest';

import MongoDbConnection from './mongo.js';

test('MongoDB - Instance', async () => {
  const mongoDb = new MongoDbConnection();

  expect(mongoDb).instanceOf(MongoDbConnection);
});
