import { Collection, Db, MongoClient } from 'mongodb';

class DatabaseManager {
  private client: MongoClient;
  private db: Db | null = null;
  private collection: Collection | null = null;

  constructor(uri: string, private dbName: string, private collectionName: string) {
    this.client = new MongoClient(uri);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async close(): Promise<void> {
    try {
      await this.client.close();
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  getDb(): Db | null {
    return this.db;
  }

  getCollection(): Collection | null {
    return this.collection;
  }
}

export default DatabaseManager;
