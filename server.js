const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;
const mainDir = path.join(__dirname, "/public");


// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
