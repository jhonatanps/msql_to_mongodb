const express = require('express');
const mysql = require('mysql2');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// MongoDB conexao
async function mongoConnect(){
    await mongoose.connect('mongodb://localhost:27017/login');
    console.log('Conectou ao MongoDB com Mongoose!');
}

mongoConnect().catch((err) => console.log(err));

// esquema
const userSchema = new mongoose.Schema({
    name: String,
    login: String,
    senha: String,
});

// Modelo de usuario
const User = mongoose.model('User', userSchema, 'users');

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        console.log('Erro ao recuperar usuarios: ', err);
        res.status(500).json({error: 'Erro ao recuperar usuarios'});
    }
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'produtos_mongo'
});

connection.connect((err) => {
    if(err){
        console.log("Erro ao conectar ao banco de dados", err)
        return;
    }
    console.log("Conexão MySQL bem-sucedida")
});

app.get('/allprodutos', async (req, res) => {
    try {
        const results = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produtos', (err, results) => {
                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
        console.log(results);
        res.json(results);
    } catch (error) {
        console.log('Erro ao executar um consulta: ', error);
        res.status(500).json({error: 'Erro ao executar um consulta'});
    }
})


app.listen(3000, () => {
    console.log("Esta rodando no porta 3000!");
});