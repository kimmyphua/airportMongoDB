const mongoose = require('mongoose')
const {Schema} = require("mongoose");


const FlightSchema = new Schema ({
    name: {type:String, required:true},
    from: {type:String, required:true},
    to: {type:String, required:true},
    airline: {type:String, required:true},
    passenger: {
        type: Schema.Types.Array,
        ref: 'Passenger'
    }
});


module.exports = mongoose.model('Flight', FlightSchema)
