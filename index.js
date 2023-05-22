const express = require("express");
require('dotenv').config();
const cors = require('cors');
app.use('/', require('./routes/auth'))

//Crear Express App
const app = express();
app.use(cors());

//Para que escuche el body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

//Rutas
app.get('/api', (req, res) => {
    res.json({message: "FUNCIONAAAAA"});
})

//app.use('/api/auth', require('./routes/auth'))

//Escuchar en puerto 3001
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ', process.env.PORT)
})