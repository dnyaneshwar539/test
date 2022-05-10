const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    order_id:{
        type:String,
        // required:true
    },
    customer_name:{
        type:String,
        // required:true
    },
    washer_name:{
        type:String,
        // required:true
    },
    rating:{
        type:String,
        // required:true
    },
    comment:{
        type:String,
        // required:true
    }
    // fan_service_point:{
    //     type:Array,
    //     required:true
    // }
})



module.exports = mongoose.model('customer_feedback',data)