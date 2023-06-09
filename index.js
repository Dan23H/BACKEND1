const express = require("express");
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp')
const { dbConnection } = require('./database/config')

//Crear Express App
const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}));

//Database
dbConnection()

//Para que escuche el body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

//Rutas
app.use('/',require('./routes/auth'))
//app.use('/images', require('./routes/image'));
app.get('/test', (req, res) => {
    res.json({message: "FUNCIONAAAAA"});
})

//app.use('/api/auth', require('./routes/auth'))

//Escuchar en puerto 27000
app.listen(process.env.PORT, () => {
    Puerto = process.env.PORT
    console.log(`Servidor corriendo en puerto: ${Puerto}`)
})