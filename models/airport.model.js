const mongoose = require('mongoose')
const {Schema} = require("mongoose");


const AirportSchema = new Schema ({
    name: {type:String, required:true},
    country: {type:String, required:true},
    terminal: {
        type: Schema.Types.Array,
        ref: 'Terminal'
    },
    opened: {type:Number}
});


module.exports = mongoose.model('Airport', AirportSchema)
