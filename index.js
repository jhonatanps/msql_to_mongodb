const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());


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
    console.log("Conexão bem-sucedida")
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