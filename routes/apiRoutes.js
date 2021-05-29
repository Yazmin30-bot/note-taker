
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

  //Create a get request to show a JSON of the specific ID data in the table
  app.get('/api/notes/:id', (req, res) => {
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const chosen = req.params.id;
    console.log(chosen);
    /* Check each noteDate and see if the same as "chosen"
     If the statement is true, send the note back as JSON,
     otherwise tell the user no note was found */
    for (let i = 0; i < noteData.length; i++) {
      if (chosen === noteData[i].id) {
        return res.json(noteData[i]);
      }
    }
    return res.json(false);
  })

};
