const express = require('express');
const Image = require('../models/image')

const subirImagen = async (req, res = express.request) => {
    const image = new Image( req.body )
    try {
        image.client = req.uid
        const saved = await image.save()
        res.status(200).json({
            ok: true,
            image: saved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            image: "Internal Error"
        })
    }
}