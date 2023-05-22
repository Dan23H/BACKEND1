const express = require('express')
const router = express.Router()

const {registro, login, perfil, editarPerfil, mensajes,
    enviarMensaje, notificacion} = require('../controllers/auth')

router.post("/register",registro)
router.post("/login",login)
router.get("/profile",perfil)
router.post("/editprofile",editarPerfil)
router.get("/messages",mensajes)
router.post("/sendMessages",enviarMensaje)
router.get("/notifications",notificacion)

module.exports = router