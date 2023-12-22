import dotenv from 'dotenv';
import path from 'path';
import { Payload } from 'payload';
import loadDirectDb from './loadDirectDb';
import DatabaseManager from './utils/DatabaseManager';

dotenv.config();

const MONGO_URI = process.env.DATABASE_URI || '';
const DB_NAME = process.env.DATABASE_NAME || '';
const COLLECTION_NAME = process.env.DATABASE_COLLECTION_NAME || '';

if (!MONGO_URI || !DB_NAME || !COLLECTION_NAME) {
  throw new Error('One or more environment variables are undefined.');
}

export const seedStocks = async (payload: Payload): Promise<void> => {
  const dbManager = new DatabaseManager(MONGO_URI, DB_NAME, COLLECTION_NAME);

  try {
    payload.logger.info('— Seeding Stocks');
    await dbManager.connect();

    const db = dbManager.getDb();
    const collection = dbManager.getCollection();

    if (!db || !collection) {
      throw new Error('Database or Collection is not initialized');
    }

    const uri = path.resolve(__dirname, '../../../../assets');
    const files = [
      `${uri}/13-12-2023_NEGOCIOSAVISTA.txt`,
      `${uri}/14-12-2023_NEGOCIOSAVISTA.txt`,
    ];

    for (const file of files) {
      await loadDirectDb(file, payload, db, collection);
    }

    payload.logger.info('Import completed successfully.');
  } catch (error) {
    console.error('Error during the seeding operation:', error);
    payload.logger.error('Error during the seeding operation:', JSON.stringify(error, null, 2));
  } finally {
    await dbManager.close();
    payload.logger.info('— End Seeding Stocks');
  }
};
