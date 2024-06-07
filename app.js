const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'formulario_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para exibir o formulário
app.get('/', (req, res) => {
    res.render('formulario');
});

// Rota para lidar com o envio do formulário
app.post('/submit', (req, res) => {
    const { nome, email, telefone, data_nascimento } = req.body;
    const query = `INSERT INTO usuarios (nome, email, telefone, data_nascimento) VALUES (?, ?, ?, ?)`;
    connection.query(query, [nome, email, telefone, data_nascimento], (err, result) => {
        if (err) throw err;
        console.log('Dados inseridos com sucesso');
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});