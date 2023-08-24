// sum.test.js
import 'reflect-metadata';

import { Collection, FindCursor, ObjectId, WithId } from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Connection, MongoDbRepositoryFindOptions, User } from '../../index.js';
import UserRepository from './repository.js';

test('Repository - Find all connection', async () => {
  const connectionMock = mock<Connection>();
  const collectionMock = mock<Collection>();

  const expected: User = {
    email: 'test@gmail.com'
  };

  const expectedWithId: WithId<User> = {
    ...expected,
    _id: new ObjectId('123123123123')
  };

  const profile = new UserRepository(connectionMock);

  const options: MongoDbRepositoryFindOptions<User> = {
    skip: 0,
    limit: 10,
    sortBy: 'email',
    sortDirection: -1,
    filter: {
      email: { $eq: 'test@gmail.com' }
    }
  };

  const cursor = mock<FindCursor<WithId<User>>>();

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
    email: { $eq: 'test@gmail.com' }
  });
  expect(cursor.skip).toBeCalledWith(0);
  expect(cursor.limit).toBeCalledWith(10);
  expect(cursor.sort).toBeCalledWith({ email: -1 });
  expect(cursor.toArray).toBeCalled();
});
