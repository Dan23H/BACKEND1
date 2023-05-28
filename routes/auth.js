const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const { registro, login, perfil, editarPerfil, mensajes,
    enviarMensaje, notificacion, subirImagen, verImagen } = require('../controllers/auth')

router.post("/subirimagen", upload.single('imagen'), subirImagen)
router.post("/register", registro)
router.post("/login", login)
router.get("/profile", perfil)
router.put("/profile", editarPerfil)
router.get("/messages", mensajes)
router.post("/messages", enviarMensaje)
router.get("/notifications", notificacion)

router.get("/verimagen/:id", verImagen)

module.exports = router