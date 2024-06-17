const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'yourdatabase'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/addFavorite', (req, res) => {
    const { title, year, type, poster } = req.body;
    const sql = 'INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, year, type, poster], (err, result) => {
        if (err) {
            console.error('Error adding to favorites:', err.stack);
            res.status(500).json({ success: false, message: 'Error adding to favorites' });
            return;
        }
        res.json({ success: true, message: 'Added to favorites' });
    });
});

app.get('/api/favorites', (req, res) => {
    db.query('SELECT * FROM favorites', (err, results) => {
        if (err) {
            console.error('Error fetching favorites:', err.stack);
            res.status(500).send('Error fetching favorites');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
