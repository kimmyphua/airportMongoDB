const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new Schema ({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String,
    firstname: String,
    lastname: String,
    username: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false },
    isNormal: {type: Boolean, default: true },
    flight: [
        {
            type: Schema.Types.Array,
            ref: "Flight"
        }
    ],


})

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model("User", userSchema)
