import { faker } from '@faker-js/faker';
import { ObjectId, Profile, User } from 'library';

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

function getRandomId(items: ObjectId[]) {
  const id = items[Math.floor(Math.random() * items.length)];
  if (!id) {
    throw new Error('Random ID not found');
  }

  return id;
}

export function getProfiles(length: number, usersIds: ObjectId[]): Profile[] {
  return Array.from({
    length
  }).map(() => {
    const userId = getRandomId(usersIds);

    const user: Profile = {
      birthday: faker.date
        .between({ from: '1942-01-01', to: '2004-01-01' })
        .toISOString(),
      userId,
      weight: faker.number.float({ min: 50, max: 150 })
    };

    return user;
  });
}
