const express = require('express')
const router = express.Router()

const {registro, login, perfil, editarPerfil, mensajes,
    enviarMensaje, notificacion, subirImagen} = require('../controllers/auth')

router.post("/register",registro)
router.post("/login",login)
router.get("/profile",perfil)
router.put("/profile",editarPerfil)
router.get("/messages",mensajes)
router.post("/messages",enviarMensaje)
router.get("/notifications",notificacion)

router.post("/subirimagen", subirImagen)

module.exports = router