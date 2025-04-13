const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); // enable verbose logging for SQLite errors and warnings

const app = express();
const port = 8000;

// --------------------------------------------------
// middleware setup
// --------------------------------------------------

// enable cross-origin requests (e.g., frontend running on different port)
app.use(cors());

// parse incoming JSON request bodies into req.body
app.use(express.json());

// --------------------------------------------------
// connect to SQLite database
// --------------------------------------------------

const db = new sqlite3.Database('./data/data.db', (err) => {
  if (err) {
    // this means SQLite failed to open the file (bad path, corrupt file, etc.)
    console.error('error connecting to database:', err.message);
  } else {
    // if no error, the database file is ready for use
    console.log('connected to the SQLite database');
  }
});

// --------------------------------------------------
// API routes for tasks
// --------------------------------------------------

// create a new task (called from POST /tasks)
app.post('/tasks', (req, res) => {
  // extract fields from incoming JSON body
  const { ID, Name, Description, DueDate, Priority, Location, Status } = req.body;

  // SQL command to insert new row into tblTasks
  const comInsert = `
    INSERT INTO tblTasks (ID, Name, Description, DueDate, Priority, Location, Status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // run the insert command with parameterized values to avoid SQL injection
  db.run(comInsert, [ID, Name, Description, DueDate, Priority, Location, Status], function (err) {
    if (err) {
      // if the insert fails (e.g., duplicate ID, constraint error), return 400 with error message
      console.log(err);
      res.status(400).json({ status: 'error', message: err.message });
    } else {
      // if insert succeeds, return 201 and the inserted ID
      res.status(201).json({ status: 'success', ID: this.lastID });
    }
  });
});

// get all tasks (called from GET /tasks)
app.get('/tasks', (req, res) => {
  // SQL command to retrieve all rows from the table
  const comSelect = 'SELECT * FROM tblTasks';

  // run the query and return all results in an array
  db.all(comSelect, [], (err, rows) => {
    if (err) {
      // if query fails (e.g., table doesn't exist), return 400
      console.log(err);
      res.status(400).json({ status: 'error', message: err.message });
    } else {
      // return successful result as array of tasks
      res.status(200).json({ status: 'success', tasks: rows });
    }
  });
});

// get a single task by ID (called from GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
  // prepare SQL query to fetch one tasks using ID
  const comSelect = 'SELECT * FROM tblTasks WHERE ID = ?';
  const { id } = req.params; // extract ID from URL

  // run the query with given ID
  db.get(comSelect, [id], (err, row) => {
    if (err) {
      // on SQL error, return 400
      console.log(err);
      res.status(400).json({ status: 'error', message: err.message });
    } else {
      if (row) {
        // if task found, return it
        res.status(200).json({ status: 'success', task: row });
      } else {
        // if not found, return 404
        res.status(404).json({ status: 'error', message: 'Task not found' });
      }
    }
  });
});

// update an existing task (called from PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
  // extract updated fields from body
  const { Name, Description, DueDate, Priority, Location, Status } = req.body;
  const { id } = req.params; // get ID from URL

  // prepare SQL update statement
  const comUpdate = `
    UPDATE tblTasks 
    SET Name = ?, Description = ?, DueDate = ?, Priority = ?, Location = ?, Status = ? 
    WHERE ID = ?
  `;

  // execute update with parameters
  db.run(comUpdate, [Name, Description, DueDate, Priority, Location, Status, id], function (err) {
    if (err) {
      // on SQL error, return 400
      console.log(err);
      res.status(400).json({ status: 'error', message: err.message });
    } else {
      if (this.changes > 0) {
        // if a row was updated, return success
        res.status(200).json({ status: 'success', message: 'Task updated' });
      } else {
        // if no row matched the ID, return 404
        res.status(404).json({ status: 'error', message: 'Task not found' });
      }
    }
  });
});

// delete a task by ID (called from DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  // prepare SQL delete statement
  const comDelete = 'DELETE FROM tblTasks WHERE ID = ?';

  // run delete operation
  db.run(comDelete, [id], function (err) {
    if (err) {
      // return 400 on failure
      console.log(err);
      res.status(400).json({ status: 'error', message: err.message });
    } else {
      if (this.changes > 0) {
        // confirm deletion if row existed
        res.status(200).json({ status: 'success', message: 'Task deleted' });
      } else {
        // if no row was deleted (e.g., nonexistent ID), return 404
        res.status(404).json({ status: 'error', message: 'Task not found' });
      }
    }
  });
});

// --------------------------------------------------
// start the server
// --------------------------------------------------

// start express server on port 8000 and log a confirmation
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
