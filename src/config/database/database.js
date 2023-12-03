import { Sequelize } from 'sequelize';

import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URL, {
  logging: false,
});

export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been estabilished successfully :)');
  } catch (error) {
    console.log(error);
  }
}

export async function syncUp() {
  try {
    await sequelize.sync();
    console.log('Database has been synced succesfully :)');
  } catch (error) {
    console.log(error);
  }
}
