const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    downpayment:{
        type:String,
        required:true
    },
    tenure:{
        type:String
    },
    
    loan_amount: {
            type:String
        },
    interest_rate: {
        type:String
    },
    total_amount: {
        type:String
    },
    emi: {
        type:String
    },
    saving:{
        type:String
    },
   
})



module.exports = mongoose.model('bajajtenure',data)