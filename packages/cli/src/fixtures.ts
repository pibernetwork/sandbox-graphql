import { faker } from '@faker-js/faker';
import { Profile, User } from 'library';

export function getUsers(length: number): User[] {
  return Array.from({
    length
  }).map(() => {
    const user: User = {
      email: faker.internet.email()
    };

    return user;
  });
}

export function getProfiles(length: number): Profile[] {
  return Array.from({
    length
  }).map(() => {
    const user: Profile = {
      birthday: faker.date.past().toISOString(),
      userId: faker.lorem.words(5)
    };

    return user;
  });
}
