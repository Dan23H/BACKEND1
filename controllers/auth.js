const express = require('express');
const Cliente = require('../models/cliente');
const Image = require('../models/image');
const upload = require('../libs/storage');

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
        const user = new Cliente({ name: nombre, email: correo, password: contraseña, country: "", photo: "", frontPage: "" })
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
}
//------------FIN PANTALLA DE LOGIN O REGISTRO--------------------------

//------------PERFIL----------------------------------------
const perfil = async (req, res = express.request) => {
    const { correo } = req.query;
    try {
        const profile = await Cliente.findOne({ email: correo })
        console.log(profile)
        console.log(profile.name)
        console.log(profile.photo)
        console.log(profile.frontPage)
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
            error
        })
    }

}

const editarPerfil = async (req, res = express.request) => {
    const { correo, pais, foto, portada } = req.body;

    try {
        const upProfile = await Cliente.findOneAndUpdate(
            { email: correo },
            { $set: { photo: foto, frontPage: portada, country: pais } },
            { new: true }
        )
        if (!upProfile) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }
        
        res.status(200).json({
            ok: true,
            editedProfile: {
                name: upProfile.name,
                photo: upProfile.photo,
                frontPage: upProfile.frontPage,
                country: upProfile.country
            }
        })
        upProfile = await upProfile.save();
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }
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

const subirImagen = async (req, res) => {
try {
    const { categoria, descripcion } = req.body;
    const { buffer, mimetype } = req.file;

    // Crea un nuevo documento de imagen utilizando el modelo
    const image = new Image({
      imagen: {
        data: buffer,
        contentType: mimetype
      },
      categoria,
      descripcion
    });

    // Guarda la imagen en la base de datos
    await image.save();

    res.status(200).json({ message: 'Imagen subida exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al subir la imagen' });
  }

    /*const { categoria, descripcion, imagen, userId } = req.body;
    const imagenBuffer = imagen.buffer;

    console.log(categoria);  
    console.log(descripcion);
    console.log(imagen)
    try {
      const nuevaImagen = new Imagen({
        categoria,
        descripcion,
        imagen: imagenBuffer,
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
    }*/
  };

  const verImagen = async (req, res) => {
    try {
      const imagen = await Image.findById(req.body.id);
      console.log(imagen)
      
      if (!imagen) {
        return res.status(404).json({
          ok: false,
          error: 'Imagen no encontrada',
        });
      }
      res.set('Content-Type', imagen.imagen.contentType);

      res.send({
        'id': imagen.id,
        'descripcion': imagen.descripcion,
        'categoria': imagen.categoria,
        'imagen': {
          'data': imagen.imagen.data,
          'contentType': imagen.imagen.contentType
        }
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error: error.message,
      });
    }
  };  

  const verTodasLasImagenes = async (req, res) => {
    try {
      const imagenes = await Image.find();
      if (!imagenes || imagenes.length === 0) {
        return res.status(404).json({
          ok: false,
          error: "No se encontraron imágenes",
        });
      }
  
      const imagesData = imagenes.map((imagen) => {
        return{
          'id': imagen.id,
          'descripcion': imagen.descripcion,
          'categoria': imagen.categoria,
          'imagen': {
            'data': imagen.imagen.data.toString("base64"),
            'contentType': imagen.imagen.contentType
          }
        };
      });
  
      res.json({
        ok: true,
        imagenes: imagesData,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error: error.message,
      });
    }
  };

//------------------------EXPORTS--------------------------
module.exports = {
    registro,
    login,
    perfil,
    editarPerfil,
    mensajes,
    enviarMensaje,
    notificacion,
    subirImagen,
    verImagen, 
    verTodasLasImagenes
}