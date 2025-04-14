const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS for all origins during development
app.use(bodyParser.json());

// GET - Read all voluntarios
app.get('/voluntarios', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Read error db.json:', err);
            return res.status(500).send('Error reading database.');
        }
        res.status(200).send(data);
    });
});

// POST - Create a new voluntarios
app.post('/voluntarios', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Read error db.json:', err);
            return res.status(500).send('Error reading database.');
        }

        try {
            const db = JSON.parse(data);
            const newVoluntarios = req.body;

            // Validate the new Voluntarios
            if (!newVoluntarios.nome || !newVoluntarios.celular ) {
                return res.status(400).send(' Preencha todos os campos.');
            }

            // Generate sequential ID
            const voluntarios = db.voluntarios;
            let nextId = 1;
            if (voluntarios.length > 0) {
                nextId = voluntarios.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
            }
            newVoluntarios.id = nextId;

            // Push to voluntarios
            db.voluntarios.push(newVoluntarios);

            // Write to db.json
            fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Write error db.json:', err);
                    return res.status(500).send('Error writing to database.');
                }
                console.log(`Created new voluntarios with id ${nextId}`);
                res.status(201).send(JSON.stringify(newVoluntarios));
            });
        } catch (error) {
            console.error("Error processing JSON data:", error);
            res.status(500).send('Error processing JSON data.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});