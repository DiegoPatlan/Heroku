const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3308;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'regalo_app',
    port: 3306 // Asegúrate de que este puerto coincida con el puerto de MySQL
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Detener el servidor si no se puede conectar a la base de datos
    }
    console.log('Conexión exitosa a la base de datos');
});

app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    // Asegúrate de que el nombre de la tabla sea el correcto
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
