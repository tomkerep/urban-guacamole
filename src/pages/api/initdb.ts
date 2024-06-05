import type { APIRoute } from "astro";
import sqlite from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./src/database/", "urbanguacamole.db");
console.log(dbPath);

export const GET: APIRoute = ({ params, request }) => {
  let db = new sqlite(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    verbose: console.log;
  });

  // Create Persons table if it doesn't exist
  let resultPersons = db.exec(`
    CREATE TABLE IF NOT EXISTS Persons (
      'id' TEXT NOT NULL, 
      'prename' TEXT NOT NULL DEFAULT '', 
      'surname' TEXT NOT NULL DEFAULT '', 
      'age' INT NOT NULL DEFAULT 0, 
      'schoolClass' TEXT NOT NULL DEFAULT '', 
      'createdAt' INT NOT NULL DEFAULT 0, 
      'updatedAt' INT NOT NULL DEFAULT 0
    )
  `);
  console.log(resultPersons);

  // Create Tasks table if it doesn't exist
  let resultTasks = db.exec(`
    CREATE TABLE IF NOT EXISTS Tasks (
      'taskId' TEXT NOT NULL, 
      'taskName' TEXT NOT NULL DEFAULT '', 
      'status' INT NOT NULL DEFAULT 0, 
      'kommentar' TEXT NOT NULL DEFAULT '',
      'personId' INT NOT NULL DEFAULT 0, 
      'createdAt' INT NOT NULL DEFAULT 0, 
      'updatedAt' INT NOT NULL DEFAULT 0
    )
  `);
  console.log(resultTasks);

  db.close();
  return new Response(
    JSON.stringify({ success: "ok", errorMessage: "Database initialized" })
  );
};
