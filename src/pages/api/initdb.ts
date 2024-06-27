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

  // Create MedicalRecords table if it doesn't exist
  let resultMedical = db.exec(`
    CREATE TABLE IF NOT EXISTS Medical (
      'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      'personId' TEXT NOT NULL,
      'address' TEXT NOT NULL DEFAULT '',
      'allergies' TEXT NOT NULL DEFAULT '',
      'bloodType' TEXT NOT NULL DEFAULT '',
      'medicalConditions' TEXT NOT NULL DEFAULT '',
      'medicine' TEXT  NOT NULL DEFAULT '',
      'emergencyContact' TEXT NOT NULL DEFAULT '',
      'phoneNumber' TEXT NOT NULL DEFAULT '',
      'comments' TEXT NOT NULL DEFAULT '',
      'createdAt' INT NOT NULL DEFAULT 0,
      'updatedAt' INT NOT NULL DEFAULT 0
    )
  `);
  console.log(resultMedical);

  db.close();
  return new Response(
    JSON.stringify({ success: "ok", errorMessage: "Database initialized" })
  );
};
