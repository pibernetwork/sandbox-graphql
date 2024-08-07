import { ObjectId } from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import {
  MongoDbServiceFindOptions,
  Profile,
  ProfileWithId
} from '../../index.js';
import ProfileRepository from './repository.js';
import ProfileService from './service.js';

test('Service - Find one', async () => {
  const profileRepository = mock<ProfileRepository>();

  // const profileService = mock<ProfileService>();

  const service = new ProfileService(profileRepository);

  const expected: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 95
  };

  profileRepository.findOne.mockResolvedValue(expected);

  const findOne = await service.findOne('123123123123');

  expect(findOne).toEqual(expected);

  expect(profileRepository.findOne).toBeCalled();
});

test('Service - Find all connection', async () => {
  const profileRepository = mock<ProfileRepository>();

  // const profileService = mock<ProfileService>();

  const service = new ProfileService(profileRepository);

  const expected: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 95
  };

  profileRepository.findAllConnection.mockResolvedValue(
    Array(10).fill(expected)
  );

  profileRepository.findAllConnectionCount.mockResolvedValue(450);

  const options: MongoDbServiceFindOptions<Profile> = {
    page: 1,
    perPage: 10,
    filter: {
      weight: {
        between: {
          from: 10,
          to: 20
        }
      }
    },
    sortBy: 'birthday',
    sortDirection: 'asc'
  };

  const allConnections = await service.findAllConnection(options);

  const { nodes, pageInfo } = allConnections;

  expect(nodes[0]?._id.toString()).toEqual(expected._id.toString());

  expect(pageInfo.page).toEqual(1);
  expect(pageInfo.hasNextPage).toEqual(true);
  expect(pageInfo.nextPage).toEqual(2);
  expect(pageInfo.hasPrevPage).toEqual(false);
  expect(pageInfo.prevPage).toEqual(null);
  expect(pageInfo.totalNodes).toEqual(450);
  expect(pageInfo.totalPages).toEqual(45);
  expect(pageInfo.start).toEqual(1);
  expect(pageInfo.end).toEqual(10);

  expect(profileRepository.findAllConnection).toBeCalledWith({
    skip: 0,
    limit: 10,
    filter: {
      weight: { $gt: 10, $lt: 20 }
    },
    sortBy: 'birthday',
    sortDirection: 1
  });

  expect(profileRepository.findAllConnectionCount).toBeCalledWith({
    weight: { $gt: 10, $lt: 20 }
  });
});

test('Service - Insert one - OK', async () => {
  const profileRepository = mock<ProfileRepository>();

  // const profileService = mock<ProfileService>();

  const service = new ProfileService(profileRepository);

  const expected: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 95
  };
  profileRepository.insertOne.mockResolvedValue(expected);

  const node = await service.insertOne(expected);

  expect(node.errors).toEqual([]);
  expect(node.node).toEqual(expected);

  expect(profileRepository.insertOne).toBeCalled();
});

test('Service - Insert One - Errors', async () => {
  const profileRepository = mock<ProfileRepository>();

  // const profileService = mock<ProfileService>();

  const service = new ProfileService(profileRepository);
  // @ts-expect-error Incomplete Profile
  const expected: ProfileWithId = {};

  profileRepository.insertOne.mockResolvedValue(expected);

  const node = await service.insertOne(expected);

  expect(node.node).toBeNull();
  expect(node.errors.length).toEqual(3);
});

test('Service - Update one - OK', async () => {
  const profileRepository = mock<ProfileRepository>();

  const profileId = '123412341234';

  // const profileService = mock<ProfileService>();

  const service = new ProfileService(profileRepository);

  const expected: ProfileWithId = {
    _id: new ObjectId('123123123123'),
    userId: new ObjectId('123123123123'),
    birthday: '123123123',
    weight: 95
  };
  profileRepository.updateOne.mockResolvedValue(expected);

  const node = await service.updateOne(profileId, expected);

  expect(node.errors).toEqual([]);
  expect(node.node?._id.toString()).toEqual(expected._id.toString());

  expect(profileRepository.updateOne).toBeCalled();
});

test('Service - Update One - Errors', async () => {
  const profileRepository = mock<ProfileRepository>();

  // const profileService = mock<ProfileService>();

  const profileId = '123412341234';

  const service = new ProfileService(profileRepository);
  // @ts-expect-error Incomplete Profile
  const expected: ProfileWithId = {};

  profileRepository.insertOne.mockResolvedValue(expected);

  const node = await service.updateOne(profileId, expected);

  expect(node.node).toBeNull();
  expect(node.errors.length).toEqual(3);
});

test('Service - Delete One', async () => {
  const profileRepository = mock<ProfileRepository>();

  const service = new ProfileService(profileRepository);

  const profileId = '123412341234';

  profileRepository.deleteOne.mockResolvedValue(true);

  const node = await service.deleteOne(profileId);

  expect(node).toBeTruthy();
});
