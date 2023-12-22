import type { Payload } from 'payload';

import { seedStocks } from '../../collections/stock/seed';
import { seedUsers } from '../../collections/users/seed';

const collections = [];

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info(`— clearing the database`);
  await Promise.all([
    ...collections.map(async (collection) =>
      payload.delete({
        collection,
        where: {},
      })
    ), // eslint-disable-line function-paren-newline
  ]);

  await seedUsers(payload);
  await seedStocks(payload);

  payload.logger.info('Seeded database successfully!');
};
