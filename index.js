const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());







app.listen(3000, () => {
    console.log("Esta rodando no porta 3000!");
});