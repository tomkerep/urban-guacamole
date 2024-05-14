import type { APIRoute } from 'astro';
import sqlite from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve("./src/database/", "database.db");
console.log(dbPath);

export const GET: APIRoute = ({ params, request }) => {
  let db = new sqlite(dbPath , sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    verbose: console.log
  });
  let result = db.exec("CREATE TABLE IF NOT EXISTS Persons ('id' TEXT NOT NULL, 'prename' TEXT NOT NULL DEFAULT '', 'surname' TEXT NOT NULL DEFAULT '', 'schoolClass' TEXT NOT NULL DEFAULT '', 'age' INT NOT NULL DEFAULT 0, 'img' TEXT NOT NULL DEFAULT '', updatedAt INT NOT NULL DEFAULT 0)");
  console.log(result);
  db.close();
  return new Response(JSON.stringify({ success: "ok", errorMessage: "Database initialized" }));
}