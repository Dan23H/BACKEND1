const express = require('express');

//------------PANTALLA DE LOGIN O REGISTRO-----------------------------
const registro = (req, res = express.request) => {
    const {usuario, correo, contraseña, confirmarContraseña} = req.body;

    res.status(200).json({
        ok: true,
        usuario, correo, contraseña, confirmarContraseña
    })
}

const login = (req, res = express.request) => {
    const {usuario, contraseña} = req.body;
    res.status(200).json({
        ok: true,
        usuario, contraseña
    })
}
//------------FIN PANTALLA DE LOGIN O REGISTRO--------------------------

//------------PERFIL----------------------------------------
const perfil = (req, res = express.request) => {
    const {fotoPerfil, portada} = req.body;
    res.status(200).json({
        ok: true,
        fotoPerfil, portada
    })
}

const editarPerfil = (req, res = express.request) => {
    const {nombre, pais, fotoPerfil, portada} = req.body;
    res.status(200).json({
        ok: true,
        nombre, pais, fotoPerfil, portada
    })
}
//--------------FIN PERFIL---------------------------------

//----------------MENSAJES---------------------------------
const mensajes = (req, res = express.request) => {
    const {fotoPerfil, usuario, asunto} = req.body;
    res.status(200).json({
        ok: true,
        fotoPerfil, usuario, asunto
    })
}

const enviarMensaje = (req, res = express.request) => {
    const {destinatario, asunto, descripcion} = req.body;
    res.status(200).json({
        ok: true,
        destinatario, asunto, descripcion
    })
}
//---------------FIN MENSAJES------------------------------

//----------------NOTIFICACIONES---------------------------
const notificacion = (req, res = express.request) => {
    const {imagen, descripcion} = req.body;
    res.status(200).json({
        ok: true,
        imagen, descripcion
    })
}
//----------------FIN NOTIFICACIONES-----------------------

//------------------------EXPORTS--------------------------
module.exports = {
    registro,
    login,
    perfil,
    editarPerfil,
    mensajes,
    enviarMensaje,
    notificacion
}