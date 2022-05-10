const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    downpayment:{
        type:String,
        required:true
    },
   
})



module.exports = mongoose.model('bajajdp',data)