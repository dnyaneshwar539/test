const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    document_name:{
        type:String,
        required:true
    },
    rented:{
        type:String,
        //required:true
    },
    owned:{
        type:String,
        //required:true
    },
})



module.exports = mongoose.model('adm_service',data)