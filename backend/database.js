const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite3";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE "streamers" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "name"	TEXT NOT NULL,
            "description"	TEXT NOT NULL,
            "photo"	TEXT,
            "upvotes"	INTEGER DEFAULT 0,
            "downvotes"	INTEGER DEFAULT 0,
            "platform"	TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT INTO streamers (name, description, photo, platform) VALUES (?,?,?,?)";
          db.run(insert, ["Asmon", "Asmon description", "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png","Twitch"]);
          db.run(insert, ["XQC", "XQC description", "https://ichef.bbci.co.uk/news/976/cpsprodpb/11FA8/production/_117804637_0b1c272a-b3dd-4045-9e6c-c64a96f56c18.jpg","Twitch"]);
        }
      }
    );
  }
});

module.exports = db;
