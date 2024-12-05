const db = require('../models/db');

exports.createNote = (req, res) => {
    const { title, datetime, note } = req.body;
    const sql = `INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)`;
    db.query(sql, [title, datetime, note], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Note created successfully', id: result.insertId });
    });
};

exports.getAllNotes = (req, res) => {
    const sql = `SELECT * FROM notes`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};

exports.getNoteById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM notes WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: 'Note not found' });
        res.status(200).send(result[0]);
    });
};


exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const sql = `UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?`;
    db.query(sql, [title, datetime, note, id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Note not found' });
        res.status(200).send({ message: 'Note updated successfully' }) ;
    });
};


exports.deleteNote = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM notes WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Note not found' });
        res.status(200).send({ message: 'Note deleted successfully' });
    });
};
