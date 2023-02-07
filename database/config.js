const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.CONNECTION_DB)
        //console.log(connection)
        const url = `${connection.host}:${connection.port}`
        console.log(`Mongo DB in ${url}`)
    } catch (error) {
        console.log(`error:${error.message}`)
    }
}

module.exports = connectDB