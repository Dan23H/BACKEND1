const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const { socketController } = require("../sockets/controller");

class Server {
    constructor() {
        this.headers = {
            cors: {
                origin: "https://localhost:5173",
                methods: ["GET", "POST"]
            }
        }

        // Crear Express App
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server, this.headers)

        this.paths = {
            auth: "/api"
        }

        this.connectToDB()
        this.addMiddlewares()
        this.setRoutes()

        this.sockets()
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
        this.app.use('/', require('./routes/auth'))
    }

    sockets() {
        this.io.on('connection', socket => {
            socketController(socket,this.io)
            console.log('Cliente conectado', socket.id)
            socket.on('disconnect', () => {
                console.log('Cliente desconectado') 
            })
        })
    }

    listen() {
        this.server.listen(process.env.PORT, () => {
            const port = process.env.PORT || 8080;
            console.log(`Servidor corriendo en puerto: ${port}`);
          });
    }
}

module.exports = Server