// sum.test.js
import 'reflect-metadata';

import {
  Collection,
  DeleteResult,
  FindCursor,
  ObjectId,
  UpdateResult,
  WithId
} from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import {
  Connection,
  MongoDbRepositoryFindOptions,
  Profile,
  ProfileWithId
} from '../../index.js';
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

test('Repository - Find all connection', async () => {
  const connectionMock = mock<Connection>();
  const collectionMock = mock<Collection>();

  const expected: Profile = {
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 85
  };

  const expectedWithId: WithId<Profile> = {
    ...expected,
    _id: new ObjectId('123123123123')
  };

  const profile = new ProfileRepository(connectionMock);

  const options: MongoDbRepositoryFindOptions<Profile> = {
    skip: 0,
    limit: 10,
    sortBy: 'birthday',
    sortDirection: -1,
    filter: {
      birthday: { $eq: '2010-01-01' }
    }
  };

  const cursor = mock<FindCursor<WithId<Profile>>>();

  collectionMock.find.mockReturnValue(cursor);

  cursor.skip.mockImplementationOnce(() => cursor);
  cursor.limit.mockReturnThis();
  cursor.sort.mockReturnThis();
  cursor.toArray.mockResolvedValue([expectedWithId]);

  connectionMock.getCollection.mockResolvedValue(collectionMock);

  const profilesConnection = await profile.findAllConnection(options);

  expect(profilesConnection[0]?._id.toString()).toEqual(
    expectedWithId._id.toString()
  );

  expect(collectionMock.find).toBeCalledWith({
    birthday: { $eq: '2010-01-01' }
  });
  expect(cursor.skip).toBeCalledWith(0);
  expect(cursor.limit).toBeCalledWith(10);
  expect(cursor.sort).toBeCalledWith({ birthday: -1 });
  expect(cursor.toArray).toBeCalled();
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
