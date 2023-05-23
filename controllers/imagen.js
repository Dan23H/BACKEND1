// En un nuevo archivo llamado "imageController.js" o similar
const express = require('express');
const Image = require('../models/image');

const subirImagen = async (req, res) => {
  const { categoria, descripcion, imagen, userId } = req.body;

  try {
    const nuevaImagen = new Image({
      categoria,
      descripcion,
      imagen,
      user: userId,
    });

    await nuevaImagen.save();

    res.status(200).json({
      ok: true,
      message: 'Imagen subida exitosamente',
      imagen: nuevaImagen,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {
  subirImagen,
};
