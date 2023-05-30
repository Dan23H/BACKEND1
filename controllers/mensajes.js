const Mensaje = require('../models/chat');

const todosLosMensajes = async (req, res) => {
  try {
    const chatMensaje = await Mensaje.find();
    res.json(chatMensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearMensaje = async (req, res) => {
  const { sender, content } = req.body;
  try {
    const chatMensaje = await Mensaje.create({ sender, content });
    res.status(201).json(chatMensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearMensaje, todosLosMensajes }