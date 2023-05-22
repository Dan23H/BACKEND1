const express = require('express');
const Cliente = require('../models/cliente')

//------------PANTALLA DE LOGIN O REGISTRO-----------------------------
const registro = async (req, res = express.request) => {
    const { nombre, correo, contraseña, confirmarContraseña } = req.body;
    try {
        let usuario = await Cliente.findOne({ correo: correo })
        if (!usuario) {
            usuario = await Cliente.findOne({ nombre: nombre })
        }
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Ese usuario o correo ya existe"
            })
        }

        res.status(200).json({
            ok: true,
            usuario
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const login = (req, res = express.request) => {
        const { nombre, contraseña } = req.body;
        res.status(200).json({
            ok: true,
            usuario
        })
    }
    //------------FIN PANTALLA DE LOGIN O REGISTRO--------------------------

    //------------PERFIL----------------------------------------
    const perfil = (req, res = express.request) => {
        const { fotoPerfil, portada } = req.body;
        res.status(200).json({
            ok: true,
            profile
        })
    }

    const editarPerfil = (req, res = express.request) => {
        const { nombre, pais, fotoPerfil, portada } = req.body;
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