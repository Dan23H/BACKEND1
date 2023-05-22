const express = require('express');

//------------PANTALLA DE LOGIN O REGISTRO-----------------------------
const registro = (req, res) => {
    const {usuario, correo, contraseña, confirmarContraseña} = req.body;
}

const login = (req, res) => {
    const {usuario, contraseña} = req.body;
}
//------------FIN PANTALLA DE LOGIN O REGISTRO--------------------------

//------------PERFIL----------------------------------------
const perfil = (req, res) => {
    const {fotoPerfil, portada} = req.body;
}

const editarPerfil = (req, res) => {
    const {nombre, pais, fotoPerfil, portada} = req.body;
}
//--------------FIN PERFIL---------------------------------

//----------------MENSAJES---------------------------------
const mensajes = (req, res) => {
    const {fotoPerfil, usuario, asunto} = req.body;
}

const enviarMensaje = (req, res) => {
    const {para, asunto, descripción} = req.body;
}
//---------------FIN MENSAJES------------------------------

//----------------NOTIFICACIONES---------------------------
const notificacion = (req, res) => {
    const {imagen, descripcion} = req.body;
}
//----------------FIN NOTIFICACIONES-----------------------