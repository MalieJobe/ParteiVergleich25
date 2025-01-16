import Database from 'better-sqlite3';
import { resolve } from 'path';

const dbPath = resolve('server/assets/parties.sqlite3');
const db = new Database(dbPath);

export const getAllPositions = () => {
  const stmt = db.prepare('SELECT * FROM positions');
  return stmt.all();
};

export const getCategories = () => {
  const stmt = db.prepare('SELECT DISTINCT kategorie FROM positions');
  return stmt.all();
};
