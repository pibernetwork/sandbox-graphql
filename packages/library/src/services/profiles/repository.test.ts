// sum.test.js
import 'reflect-metadata';

import { Collection, DeleteResult, ObjectId, UpdateResult } from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Connection, Profile, ProfileWithId } from '../../index.js';
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

test('Repository - Update one', async () => {
  const connectionMock = mock<Connection>();

  const collection = mock<Collection>();

  connectionMock.getCollection.mockResolvedValue(collection);

  const profileId = '313233313233313233313233';

  const profileFindOneMock: ProfileWithId = {
    _id: new ObjectId(profileId),
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 85
  };

  const profileInputMock: Profile = {
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 95
  };

  collection.findOne.mockResolvedValue(profileFindOneMock);

  collection.updateOne.mockResolvedValue(mock<UpdateResult<Profile>>());

  const profile = new ProfileRepository(connectionMock);

  const updateOne = await profile.updateOne(profileId, profileInputMock);

  expect(updateOne._id.toString()).toEqual(new Object(profileId).toString());
  expect(updateOne.weight).toEqual(profileInputMock.weight);
});

test('Repository - Delete one', async () => {
  const connectionMock = mock<Connection>();

  const collection = mock<Collection>();

  connectionMock.getCollection.mockResolvedValue(collection);

  const profileId = '313233313233313233313233';

  const profileFindOneMock: ProfileWithId = {
    _id: new ObjectId(profileId),
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 85
  };

  collection.findOne.mockResolvedValue(profileFindOneMock);

  collection.deleteOne.mockResolvedValue(mock<DeleteResult>());

  const profile = new ProfileRepository(connectionMock);

  const deleteOne = await profile.deleteOne(profileId);

  expect(deleteOne).toBeTruthy();

  expect(collection.findOne).toBeCalled();
  expect(collection.deleteOne).toBeCalled();
});
