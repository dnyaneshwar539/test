const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    pname:{
        type:String,
        required:true
    },
    pimage:{
        type:String,
        // required:true
    },
    pprice:{
        type:String,
        //required:true
    },
    psale_price:{
        type:String,
        //required:true
    },
    // pdis:{
    //     type:String,
    //     // required:true
    // }
})



module.exports = mongoose.model('Product',data)