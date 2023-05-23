const express = require('express')
const router = express.Router()

const { subirImagen, verImagen, editarImagen, eliminarImagen } = require('../controllers/imagen')

//router.get("/subirImagen", verImagen)
router.post("/subirImagen", subirImagen)
//router.put("/subirImagen", editarImagen)
//router.delete("/subirImagen", eliminarImagen)