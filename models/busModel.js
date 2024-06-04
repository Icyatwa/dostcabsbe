
// busModel.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const busSchema = new Schema({
    user_id: { type: String,required: true },
    driver: { type: String, required: true},
    licensePlates: { type: String, required: true }, 
    model: { type: String, required: true },
    capacity: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Bus', busSchema)