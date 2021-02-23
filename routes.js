const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        //parse note data in JSON
        var notes = JSON.parse(data);

        // API ROUTES
        //get notes data
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        //add notes data 
        app.post("/api/notes", function(req, res) {
            let newNote = req.body; 
            notes.push(newNote);
            updateNotes(); 
            return console.log(`Added ${newNote.title}!`); 
        });

        //get note by id 
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        //delete note by id 
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateNotes();
            console.log(`Deleted note ${req.params.id}`);
        });

        // HTML ROUTES 
        //get notes.html 
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        //get index.html 
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        //update the db json file 
        function updateNotes() {
            fs.writeFile("db/db.json",JSON.stringify(notes),err => {
                if (err) throw err;
                return true;
            });
        }

    });
}