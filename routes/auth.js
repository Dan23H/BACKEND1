const express = require('express')
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router()
// const upload = require('../libs/storage')
const upload = multer();

const {registro, login, perfil, editarPerfil, mensajes,
    enviarMensaje, notificacion, subirImagen, verImagen, verTodasLasImagenes} = require('../controllers/auth')
    
    router.post("/register",registro)
    router.post("/login",login)
    router.get("/profile",perfil)
    router.put("/profile",editarPerfil)
    router.get("/messages",mensajes)
    router.post("/messages",enviarMensaje)
    router.get("/notifications",notificacion)
    
    router.post("/subirimagen", upload.single('imagen'), subirImagen)
    router.get("/imagenes", verTodasLasImagenes);
    router.get("/image?id", verImagen)

module.exports = router