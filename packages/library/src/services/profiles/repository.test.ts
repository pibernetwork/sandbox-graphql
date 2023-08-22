// sum.test.js
import 'reflect-metadata';

import { Collection } from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Connection, Profile } from '../../index.js';
import ProfileRepository from './repository.js';

test('Repository - Find one', async () => {
  const connectionMock = mock<Connection>();

  const collection = mock<Collection>();

  connectionMock.getCollection.mockResolvedValue(collection);

  const expected: Profile = {
    userId: '123123123123',
    birthday: '123123123'
  };

  collection.findOne.mockResolvedValue(expected);

  const profile = new ProfileRepository(connectionMock);

  const findOne = await profile.findOne('123123123123');

  expect(findOne).toEqual(expected);

  expect(collection.findOne).toBeCalled();
});
