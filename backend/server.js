const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database.js");

app.use(express.json());
app.use(cors());
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
    platform: req.body.platform,
  };

  const sql =
    "INSERT INTO streamers (name, description, photo, platform) VALUES (?, ?, ?, ?)";
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

let mockAuth = [];

app.put("/streamer/:id/vote", (req, res) => {
  const streamerId = req.params.id;
  const { voteType } = req.body;

  const voteIndex = mockAuth.findIndex((item) => item.streamerId === streamerId);
  const existingVoteType = mockAuth[voteIndex]?.voteType;

  if (voteIndex > -1) {
    // Vote exists for the streamer, remove the vote
    mockAuth.splice(voteIndex, 1); // Remove the vote object

    // Decrement the corresponding vote in the database
    let sql, params;
    if (existingVoteType === "upvote") {
      sql = "UPDATE streamers SET upvotes = upvotes - 1 WHERE id = ?";
    } else if (existingVoteType === "downvote") {
      sql = "UPDATE streamers SET downvotes = downvotes - 1 WHERE id = ?";
    }
    params = [streamerId];

    db.run(sql, params, function (err) {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        console.log(err)
        return;
      }

      res.json({ message: "Vote removed" });
    });
  } else {
    // Vote doesn't exist, add the vote
    mockAuth.push({ streamerId, voteType });

    // Increment the corresponding vote in the database
    let sql, params;
    if (voteType === "upvote") {
      sql = "UPDATE streamers SET upvotes = upvotes + 1 WHERE id = ?";
    } else if (voteType === "downvote") {
      sql = "UPDATE streamers SET downvotes = downvotes + 1 WHERE id = ?";
    }
    params = [streamerId];

    db.run(sql, params, function (err) {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        console.log(err)
        return;
      }

      res.json({ message: "Vote added" });
    });
  }
});

// Default response for any other request
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
