const mongoose = require('mongoose')
const {Schema} = require("mongoose");


const PassengerSchema = new Schema ({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    dob:  {type:Number},

});


module.exports = mongoose.model('Passenger', PassengerSchema)
