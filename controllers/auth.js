const express = require('express');
const Cliente = require('../models/cliente')

//------------PANTALLA DE LOGIN O REGISTRO-----------------------------
const registro = async (req, res = express.request) => {
    const { nombre, correo, contraseña, confirmarContraseña } = req.body;
    try {
        let usuario = await Cliente.findOne({ email: correo })
        if (!usuario) {
            usuario = await Cliente.findOne({ name: nombre })
        }
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Ese usuario o correo ya existe"
            })
        }
        const user = new Cliente({ name: nombre, email: correo, password: contraseña })
        await user.save().then(() => console.log('Usuario Guardado Exitósamente'))

        return (
            res.status(200).json({
                ok: true
            })
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const login = async (req, res = express.request) => {
    const { nombre, correo, contraseña } = req.body;
    try {
        let usuario = await Cliente.findOne({ name: nombre })
        if (!usuario) {
            usuario = await Cliente.findOne({ email: correo })
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Ese usuario no está registrado."
            })
        }
        return (
            res.status(200).json({
                ok: true,
                usuario
            })
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
    res.status(200).json({
        ok: true,
        usuario
    })
}
//------------FIN PANTALLA DE LOGIN O REGISTRO--------------------------

//------------PERFIL----------------------------------------
const perfil = async (req, res = express.request) => {
    const { nombre } = req.query;
    try {
        const profile = await Cliente.findOne({ name: nombre }, { name: 1, photo: 1, frontPage: 1 })
        console.log(profile)
        if (!profile) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
        }
        res.status(200).json({
            ok: true,
            profile: {
                name: profile.name,
                photo: profile.photo,
                frontPage: profile.frontPage
            }
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }
    
}

const editarPerfil = (req, res = express.request) => {
    const { nombre, pais, foto, portada } = req.body;
    res.status(200).json({
        ok: true,
        editProfile
    })
}
//--------------FIN PERFIL---------------------------------

//----------------MENSAJES---------------------------------
const mensajes = (req, res = express.request) => {
    const { fotoPerfil, usuario, asunto } = req.body;
    res.status(200).json({
        ok: true,
        messages
    })
}

const enviarMensaje = (req, res = express.request) => {
    const { destinatario, asunto, descripcion } = req.body;
    res.status(200).json({
        ok: true,
        sendMsg
    })
}
//---------------FIN MENSAJES------------------------------

//----------------NOTIFICACIONES---------------------------
const notificacion = (req, res = express.request) => {
    const { imagen, descripcion } = req.body;
    res.status(200).json({
        ok: true,
        notification
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