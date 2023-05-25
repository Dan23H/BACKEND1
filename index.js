const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

//Crear Express App 
const app = express();
app.use(cors());

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

//Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
    Puerto = process.env.PORT || 4000
    console.log(`Servidor corriendo en puerto: ${Puerto}`)
})
