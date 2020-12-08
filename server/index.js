const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const pool = require("./db");
const { json } = require("express");

app.use(cors());
app.use(express.json());

//routes
app.post("/todos", async (req, res) => {
  try {
    const description = req.body.description;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) values ($1) returning *",
      [description]
    );
    res.send(newTodo.rows[0]);
    console.log("running from backend", newTodo.rows[0])
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos;
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM TODO");
    // const parsedData = await JSON.parse(allTodos);
    res.send(allTodos.rows);
  } catch (e) {
    console.error(e.message);
  }
});

// get one todo
app.get("/todos/:id", async (req, res) => {
  try {
    const requestedTodo = await pool.query(
      `SELECT * FROM TODO WHERE Todo_id = ${req.params.id}`
    );
    res.send(requestedTodo.rows);
  } catch (e) {
    console.error(e.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await pool.query(
      `DELETE FROM TODO WHERE TODO_ID = ${req.params.id}`
    );
    res.send(deletedTodo);
  } catch (e) {
    console.error(e.message);
  }
});

// updating a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await pool.query(
      `UPDATE TODO SET DESCRIPTION = $1 WHERE TODO_ID = ${req.params.id}`,
      [req.body.description]
    );
    res.send(updatedTodo);
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(4000, () => console.log("Server running ..."));
