const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.headers = {
            cors: {
                origin: "https://drawers7t.netlify.app",
                methods: ["GET", "POST"]
            }
        }

        // Crear Express App
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)

        this.paths = {
            auth: "/api"
        }

        this.connectToDB()
        this.addMiddlewares()
        this.setRoutes()

    }

    // Base de Datos
    async connectToDB() {
        await dbConnection()
    }

    addMiddlewares() {
        // CORS
        this.app.use(cors(this.headers))
        // Lectura y parseo del body
        this.app.use(express.json())
        // Uso de la carpeta public
        this.app.use(express.static('public'))
    }

    setRoutes() {
        // Ruta
        this.app.use('/', require('../routes/auth'))
    }

    listen() {
        this.server.listen(process.env.PORT, () => {
            const port = process.env.PORT || 27000;
            console.log(`Servidor corriendo en puerto: ${port}`);
          });
    }
}

module.exports = Server