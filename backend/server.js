const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./database.js");

app.use(express.json());
app.use(cors())
// Server port
const HTTP_PORT = 8000;

// Root endpoint
app.get("/streamers", (req, res) => {
  const sql = "SELECT * FROM streamers";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/streamers/:id", (req, res) => {
  const sql = "SELECT * FROM streamers WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        message: "success",
        data: row,
      });
    } else {
      res.status(404).json({ message: "Streamer not found" });
    }
  });
});

app.post("/streamers", (req, res) => {
  const errors = [];
  if (!req.body.name) {
    errors.push("No name provided");
  }
  if (!req.body.description) {
    errors.push("No description provided");
  }
  if (!req.body.photo) {
    errors.push("No photo provided");
  }
  if (!req.body.platform) {
    errors.push("No platform provided");
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const data = {
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    platform: req.body.platform
  };

  const sql = "INSERT INTO streamers (name, description, photo, platform) VALUES (?, ?, ?, ?)";
  const params = [data.name, data.description, data.photo, data.platform];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: "success",
      data,
      id: this.lastID,
    });
  });
});

app.put("/streamer/:id/upvote", (req, res) => {
  const streamerId = req.params.id;
  const sql = "UPDATE streamers SET upvotes = upvotes + 1 WHERE id = ?";
  const params = [streamerId];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes > 0) {
      res.json({
        message: "success",
        streamerId,
        changes: this.changes,
      });
    } else {
      res.status(404).json({ message: "Streamer not found" });
    }
  });
});

app.put("/streamer/:id/downvote", (req, res) => {
    const streamerId = req.params.id;
    const sql = "UPDATE streamers SET downvotes = downvotes + 1 WHERE id = ?";
    const params = [streamerId];
  
    db.run(sql, params, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes > 0) {
        res.json({
          message: "success",
          streamerId,
          changes: this.changes,
        });
      } else {
        res.status(404).json({ message: "Streamer not found" });
      }
    });
  });

// Default response for any other request
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
