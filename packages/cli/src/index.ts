import 'reflect-metadata';

import { program } from '@commander-js/extra-typings';
import { container } from 'library';
import DataServices from 'library/src/containers/dataServices.js';
import { getProfiles, getUsers } from './fixtures.js';

const dataServices = new DataServices(container);

const services = dataServices.getAll();

program
  .name('Cli 2')
  .description('CLI to manage sandbox-2 database')
  .version('0.1.0')
  .hook('preAction', async () => {
    await services.connection.init();
  })
  .hook('postAction', async () => {
    await services.connection.close();
  });

const DEFAULT_LOAD = 500;

program.command('user:load').action(async () => {
  const users = getUsers(DEFAULT_LOAD);
  for (const user of users) {
    await services.users.insertOne(user);
  }
});

program.command('user:list').action(async () => {
  const all = await services.users.findAll();

  console.table(all);
});

program.command('profiles:load').action(async () => {
  const profiles = getProfiles(DEFAULT_LOAD);
  for (const item of profiles) {
    await services.profiles.insertOne(item);
  }
});

program.command('profiles:list').action(async () => {
  const all = await services.profiles.findAll();

  console.table(all);
});

program.parse();
