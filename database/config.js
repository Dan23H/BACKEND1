const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION || 'mongodb+srv://admin:admin@edya2.kihuikl.mongodb.net/clientes', {
            autoIndex: true,
        })
        console.log('DB Online')
    } catch (error) {
        console.log(error.message)
        throw new Error('Error al conectar en DB')
    }
}
module.exports = { dbConnection }