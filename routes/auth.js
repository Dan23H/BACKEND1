const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const { 
    registro, 
    login, 
    perfil, 
    editarPerfil, 
    notificacion, 
    subirImagen, 
    verImagen 
} = require('../controllers/auth')

const { crearMensaje, todosLosMensajes } = require('../controllers/mensajes')

router.post("/register", registro)
router.post("/login", login)

router.get("/profile", perfil)
router.put("/profile", editarPerfil)

router.get("/messages", todosLosMensajes)
router.post("/messages", crearMensaje)

router.get("/notifications", notificacion)

router.get("/verimagen/:id", verImagen)
router.post("/subirimagen", upload.single('imagen'), subirImagen)

module.exports = router