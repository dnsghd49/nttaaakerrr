const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;
//too lazy to write the whole addy so...
const mainDir = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


//html routes
app.get("/notes", function(_req, res){
  res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function(_req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/", function(_req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

app.get("/api/notes/:id", function(req, res) {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res) {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = (notes.length).toString();
  newNote.id = uniqueID;
  notes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(notes);
})



app.delete("/api/notes/:id", function(req, res){
  let notes =JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Deleting note: ${noteID}`);
  notes = notes.filter(saved => {
    return saved.id != noteID;
});

  for (saved of notes){
    saved.id = newID.toString();
    newID++;
  };


  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});