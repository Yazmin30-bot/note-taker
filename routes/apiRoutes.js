
// imported 'fs' npm package for read/write files
const fs = require("fs");
// imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');



// ROUTING

module.exports = (app) => {
  //Create a get request to show the data in the table
  app.get('/api/notes', (req, res) => {
    //read
    // We are linking our routes to a series of "data" sources. using fs package
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(noteData);
  })

};
