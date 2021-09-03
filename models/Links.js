const {Schema, model, Types} = require('mongoose')
const schema = new Schema({

    text:{ type: String, required: true},
    link: {type:String, required: true, unique: true},
    short: {type:String, required: true, unique: true},
    password: {type: String},
    date: {type: Date, default: Date.now},
    hour: {type: Number, default: 0},
    deletehour: {type: Number, default: 0},
    deleteNoteDate: {type: Number, default: 0},
    status: {type: String,  default: "Активный"},
    email: {type: String},
    reedDate: {type: Date},
    name: {type: String},
    confirm: {type: Boolean, default: false},

})

module.exports = model('Link', schema)

