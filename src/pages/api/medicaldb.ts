import type { APIRoute } from "astro";
import sqlite from "better-sqlite3";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";


// Define the path to the SQLite database file
const dbPath = path.resolve("./src/database/urbanguacamole.db");
console.log(dbPath);

// GET method: Fetch health records for a specific person or all
export const GET: APIRoute = async ({ params }) => {
  let db = new sqlite(dbPath);
  let personId = params.personId; // Assuming personId is passed as a parameter
  let query = personId ? "SELECT * FROM Medical WHERE personId = ?" : "SELECT * FROM Medical";
  
  let medicalFromDb = db.prepare(query).all(personId);
  console.log("Medical records retrieved:", medicalFromDb);
  db.close();

  return new Response(
    JSON.stringify({
      medicalObject: {
        medical: medicalFromDb,
        success: "ok",
        message: "",
      },
    })
  );
};

// POST method: Add a new health record
export const POST: APIRoute = async ({ request }) => {
  let record = await request.json();
  let {
    personId,
    address,
    allergies,
    bloodType,
    medicalConditions,
    medicine,
    emergencyContact,
    phoneNumber,
    comments,
  } = record;

  let db = new sqlite(dbPath);
  let added;
  try {
    let stmt = db.prepare(
      "INSERT INTO Medical (id, personId, address, allergies, bloodType, medicalConditions, medicine, emergencyContact, phoneNumber, comments) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    // ...

    let id = uuidv4();
    added = stmt.run(
        id,
        personId,
        address,
        allergies,
        bloodType,
        medicalConditions,
        medicine,
        emergencyContact,
        phoneNumber,
        comments
    );
    console.log("Inserted new record with ID:", added.lastInsertRowid);
  } catch (error) {
    console.error("Error adding new record:", error);
    return new Response(
      JSON.stringify({
        success: "error",
        message: "Failed to add record",
      }),
      { status: 500 }
    );
  } finally {
    db.close();
  }

  return new Response(
    JSON.stringify({
      medicalObject: {
        record: added,
        success: "ok",
        message: "Record added successfully",
      },
    })
  );
};

// PUT method: Update an existing health record
export const PUT: APIRoute = async ({ request }) => {
  let record = await request.json();
  let {
    id,
    personId,
    address,
    allergies,
    bloodType,
    medicalConditions,
    medicine,
    emergencyContact,
    phoneNumber,
    comments,
  } = record;

  let db = new sqlite(dbPath);
  let updated;
  try {
    let stmt = db.prepare(
      "UPDATE Medical SET address = ?, allergies = ?, bloodType = ?, medicalConditions = ?, medicine = ?, emergencyContact = ?, phoneNumber = ?, comments = ? WHERE personId = ?"
    );
    updated = stmt.run(
      address,
      allergies,
      bloodType,
      medicalConditions,
      medicine,
      emergencyContact,
      phoneNumber,
      comments,
      personId
    );
    console.log("Updated record for personId:", personId);
  } catch (error) {
    console.error("Error updating record:", error);
    return new Response(
      JSON.stringify({
        success: "error",
        message: "Failed to update record",
      }),
      { status: 500 }
    );
  } finally {
    db.close();
  }

  return new Response(
    JSON.stringify({
      medicalObject: {
        record: updated,
        success: "ok",
        message: "Record updated successfully",
      },
    })
  );
};

// DELETE method: Delete a health record
export const DELETE: APIRoute = async ({ request }) => {
  let personId = request.headers.get("personId");

  if (!personId) {
    return new Response(
      JSON.stringify({
        success: "error",
        message: "Person ID missing in request",
      }),
      { status: 400 }
    );
  }

  let db = new sqlite(dbPath);
  let deleted;
  try {
    let stmt = db.prepare("DELETE FROM Medical WHERE personId = ?");
    deleted = stmt.run(personId);
    console.log("Deleted record for personId:", personId);
  } catch (error) {
    console.error("Error deleting record:", error);
    return new Response(
      JSON.stringify({
        success: "error",
        message: "Failed to delete record",
      }),
      { status: 500 }
    );
  } finally {
    db.close();
  }

  return new Response(
    JSON.stringify({
      medicalObject: {
        record: deleted,
        success: "ok",
        message: "Record deleted successfully",
      },
    })
  );
};
