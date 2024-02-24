const mongoose = require('mongoose')
const md5 = require('blueimp-md5')


const botSchema = new mongoose.Schema({
    username: {type: String, required: true},
    notifications: {type: Object, required: true},
    calendar: {type: Object, required: true}
})

const ConstructModel2 = mongoose.model('users-notification', botSchema)
module.exports = ConstructModel2