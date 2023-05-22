const express = require("express")
require('dotenv').config()
const { dbConnection } = require('./database/config')
// Crear Express App
const app = express()

//Database
dbConnection()

app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/',require('./routes/auth'))

// Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
    console.log("Servidore corriendo en puerto ",process.env.PORT)
})