// External Dependancies
const mongoose = require('mongoose')

const faceSchema = new mongoose.Schema({
    cameraId: String,
    cameraName: String,
    faceData: String,
    logDate: String
    
})

module.exports = mongoose.model('Schema', faceSchema)