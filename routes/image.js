//SOBRA, NO TENER EN CUENTA

const express = require('express')
const upload = require('../libs/storage')
const router = express.Router()

const { subirImagen, verImagen, editarImagen, eliminarImagen } = require('../controllers/imagen')

//router.get("/subirImagen", verImagen)
router.post("/subirImagen", upload.single('imagen'),subirImagen)
//router.put("/subirImagen", editarImagen)
//router.delete("/subirImagen", eliminarImagen)