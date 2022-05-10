const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    loan_id:{
        type:String,
        required:true
    },
    document_id:{
        type:String,
        // required:true
    },
    document_name:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model('loan_item',data)