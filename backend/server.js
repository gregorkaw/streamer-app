const express = require("express");
const app = express();
const db = require("./database.js");

app.use(express.json());

// Server port
var HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
// Root endpoint
app.get("/streamers", (req, res) => {
  let sql = "select * from streamers";
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Insert here other API endpoints
app.get("/streamer/:id", (req, res) => {
  const sql = "select * from streamers where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.post("/streamers", (req, res) => {
  let errors = [];
  if (!req.body.name) {
    errors.push("No name provided");
  }
  if (!req.body.description) {
    errors.push("No description provided");
  }
  if (!req.body.photo) {
    errors.push("No photo provided");
  }
  let data = {
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
  };
  const sql = "INSERT INTO streamers (name, description, photo) VALUES (?,?,?)";
  let params = [data.name, data.description, data.photo];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.put("/streamer/:id/upvote", (req, res) => {
    const streamerId = req.params.id
    db.run(
        `UPDATE streamers SET upvotes = upvotes + 1 WHERE id = ?`, 
        streamerId,
        (err, result) => {
            if(err){
                res.status(400).json({error: err.message})
                return
            }
            res.json({
                message: "success",
                streamerId: streamerId,
                changes: this.changes
            })   
        }
    )
})

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
