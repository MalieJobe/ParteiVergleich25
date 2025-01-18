import Database from 'better-sqlite3';
import { resolve } from 'path';

const dbPath = resolve('server/assets/parties.sqlite3');
const db = new Database(dbPath);

export default defineEventHandler((event) => {
  // Extract query parameters if needed
  const query = getQuery(event);

  // Fetch data from the database
  if (query.type === 'categories') {
    const stmt = db.prepare('SELECT DISTINCT kategorie FROM positions');
    return stmt.all();
  } else if (query.type === 'positions') {
    const stmt = db.prepare('SELECT * FROM positions');
    return stmt.all();
  }

  // Default response
  return { error: 'Invalid query type' };
});
