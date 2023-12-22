// userSeed.ts
import { Payload } from 'payload';

export const seedUsers = async (payload: Payload): Promise<void> => {
  try {
    payload.logger.info(`— Seeding user`);
    await payload.create({
      collection: 'users',
      data: {
        email: 'dev@teste.com',
        name: 'Dev Teste',
        password: 'test',
      },
    });
    payload.logger.info(`— User seeded successfully`);
  } catch (error) {
    console.error(error);
    payload.logger.error(`— Error creating user `);
  }
};

