import type { APIRoute } from "astro";
import sqlite from "better-sqlite3";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const dbPath = path.resolve("./src/database/urbanguacamole.db");
console.log(dbPath);

export const GET: APIRoute = async ({ params, request }) => {
  let db = new sqlite(dbPath);
  let tasksFromDb = await db.prepare("SELECT * FROM Tasks").all();
  console.log("----->", tasksFromDb);
  db.close();
  return new Response(
    JSON.stringify({
      taskObject: {
        tasks: tasksFromDb,
        success: "ok",
        message: "",
      },
    })
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  let task = await request.json();
  if (task.hasOwnProperty("taskName") && task.hasOwnProperty("kommentar")) {
    let taskId = uuidv4();
    let now = dayjs().unix();
    console.log(now);
    let db = new sqlite(dbPath);
    let added = db
      .prepare(
        "INSERT INTO Tasks (taskId, taskName, kommentar, createdAt, updatedAt) VALUES (?,?,?,?,?)"
      )
      .run(taskId, task.taskName, task.kommentar, now, now);
    db.close();
    return new Response(
      JSON.stringify({
        taskObject: {
          tasks: added,
          success: "ok",
          errorMessage: "task added",
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        success: "error",
        message: "attributes missing",
      }),
      {
        status: 400,
      }
    );
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  let task = await request.json();
  if (
    task.hasOwnProperty("taskId") &&
    task.hasOwnProperty("taskName") &&
    task.hasOwnProperty("kommentar")
  ) {
    let now = dayjs().unix();
    let db = new sqlite(dbPath);
    const updates = db
      .prepare(
        "UPDATE Tasks SET taskName = ?, kommentar = ?, updatedAt = ? WHERE taskId = ?"
      )
      .run(task.taskName, task.kommentar, now, task.taskId);
    db.close();
    return new Response(
      JSON.stringify({
        taskObject: {
          tasks: updates,
          success: "ok",
          errorMessage: "task updated",
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        success: "error",
        message: "attributes missing",
      }),
      {
        status: 400,
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  let taskId = request.headers.get("id");
  if (taskId !== null) {
    let db = new sqlite(dbPath);
    const deleted = db
      .prepare("DELETE FROM Tasks WHERE taskId = ?")
      .run(taskId);
    db.close();
    return new Response(
      JSON.stringify({
        taskObject: {
          tasks: deleted,
          success: "ok",
          errorMessage: "task deleted",
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        success: "error",
        message: "attributes missing",
      }),
      {
        status: 400,
      }
    );
  }
};
