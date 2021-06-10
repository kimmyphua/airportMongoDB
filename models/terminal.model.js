const mongoose = require('mongoose')
const {Schema} = require("mongoose");


const TerminalSchema = new Schema ({
    name: {type:String, required:true},
    flight: {
        type: Schema.Types.Array,
        ref: 'Flight'
    },
    capacity: {type:Number, required:true},

});


module.exports = mongoose.model('Terminal', TerminalSchema)
