import type { Recipe } from "@/types"

import { openDB, IDBPDatabase } from 'idb';


const DB_NAME = 'culinaryCanvasDB';
const STORE_NAME = 'recipes';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<any>> | null = null;

export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  return dbPromise;
}
