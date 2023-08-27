const mongoose = require("mongoose");

const deliveryVehicleSchema = new mongoose.Schema({
    registrationNumber : {type: Number, required: true, unique: true},
    vehicleType : {
        type: String,
        required: true,
        enum:{
            values : ["bike","truck"],
            message: "invalid vehicle type"
        }      
    },
    city : {type: String , required: true},
    activeOrdersCount : {type: Number, default: 0, max: 2}
})

module.exports = mongoose.model("deliveryVehicles",deliveryVehicleSchema);