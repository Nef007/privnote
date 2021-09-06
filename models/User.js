const {Schema, model, Types} = require('mongoose')
const schema = new Schema({
        id:{type: Number, required: true, unique: true, default: 1 },
        email:{type: String, required: true, unique: true},
        password: {type: String, required: true},

})

module.exports = model('User', schema)

