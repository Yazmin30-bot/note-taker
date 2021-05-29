
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
  });

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
  });

  //Create a post request to save the new note on the database
  app.post('/api/notes', (req, res) => {
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    //Create an unique id for each note
    let id = uuidv4();
    //Add a new attribute to each object in the database
    newNote.id = id;
    noteData.push(newNote);
    //Write the new note  to the database 
    fs.writeFile("db/db.json", JSON.stringify(noteData, '\t'), err => {
      if (err) throw err;
      return true;
    });
    res.json(true);
  });

  //Create a delete request to delete the selected note using the unique ID
  app.delete('/api/notes/:id', (req, res) => {
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const chosen = req.params.id;
    console.log(chosen);
    //if chosen note match with store note then delete of the database 
    //and return the new database without the deleted note
    for (let i = 0; i < noteData.length; i++) {
      if (chosen === noteData[i].id) {
        noteData.splice(i, 1);
        fs.writeFile("db/db.json", JSON.stringify(noteData, '\t'), err => {
          if (err) throw err;
          return true;
        });
        return res.json(noteData);
      }
    }
    return res.json(false);
  })

};
