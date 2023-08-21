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

program.command('load').action(async () => {
  const users = getUsers(DEFAULT_LOAD);

  const usersIds = await services.users.insertMany(users);

  const profiles = getProfiles(DEFAULT_LOAD, usersIds);

  await services.profiles.insertMany(profiles);
  // load users
  // load profiles
});

program.command('list:users').action(async () => {
  console.table(await services.users.findAll());
});

program.command('list:profiles').action(async () => {
  console.table(await services.profiles.findAll());
});

program.parse();
