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

function getRandomId(items: string[]) {
  const id = items[Math.floor(Math.random() * items.length)];
  if (!id) {
    throw new Error('Random ID not found');
  }

  return id;
}

export function getProfiles(length: number, usersIds: string[]): Profile[] {
  return Array.from({
    length
  }).map(() => {
    const userId = getRandomId(usersIds);

    const user: Profile = {
      birthday: faker.date.past().toISOString(),
      userId
    };

    return user;
  });
}
