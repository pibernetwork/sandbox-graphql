// sum.test.js
import 'reflect-metadata';

import { ObjectId } from 'mongodb';
import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ProfileDb } from '../../index.js';
import ProfileRepository from './repository.js';
import ProfileService from './service.js';

test('Service - Find one', async () => {
  const profileRepository = mock<ProfileRepository>();

  // const profileService = mock<ProfileService>();

  const service = new ProfileService(profileRepository);

  const expected: ProfileDb = {
    _id: new ObjectId('123123123123'),
    userId: new ObjectId('123123123123'),
    birthday: '123123123'
  };

  profileRepository.findOne.mockResolvedValue(expected);

  const findOne = await service.findOne('123123123123');

  expect(findOne).toEqual(expected);

  expect(profileRepository.findOne).toBeCalled();
});
