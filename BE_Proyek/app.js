const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const notesController = require('./controllers/notesController');

const app = express();
app.use(bodyParser.json());

// Routes
app.post('/notes', notesController.createNote);
app.get('/notes', notesController.getAllNotes);
app.get('/notes/:id', notesController.getNoteById);
app.put('/notes/:id', notesController.updateNote);
app.delete('/notes/:id', notesController.deleteNote);

// Start server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
