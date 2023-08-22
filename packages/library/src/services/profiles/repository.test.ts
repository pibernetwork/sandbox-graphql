// sum.test.js
import 'reflect-metadata';

import { Collection, ObjectId } from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Connection, Profile } from '../../index.js';
import ProfileRepository from './repository.js';

test('Repository - Find one', async () => {
  const connectionMock = mock<Connection>();

  const collection = mock<Collection>();

  connectionMock.getCollection.mockResolvedValue(collection);

  const expected: Profile = {
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 85
  };

  collection.findOne.mockResolvedValue(expected);

  const profile = new ProfileRepository(connectionMock);

  const findOne = await profile.findOne('123123123123');

  expect(findOne).toEqual(expected);

  expect(collection.findOne).toBeCalled();
});

test('Repository - Insert one', async () => {
  const connectionMock = mock<Connection>();

  const collection = mock<Collection>();

  connectionMock.getCollection.mockResolvedValue(collection);

  const profileMock: Profile = {
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 85
  };

  collection.insertOne.mockResolvedValue({
    insertedId: new ObjectId('313233313233313233313233'),
    acknowledged: true
  });

  const profile = new ProfileRepository(connectionMock);

  const insertOne = await profile.insertOne(profileMock);

  expect(insertOne._id.toString()).toEqual(
    new Object('313233313233313233313233').toString()
  );
  expect(insertOne.weight).toEqual(profileMock.weight);
});
