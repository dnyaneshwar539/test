const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    loanname:{
        type:String,
        required:true
    },
    dp_type:{
        type:String,
        // required:true
    },
    interest_rate:{
        type:String,
        //required:true
    },
    total_amount:{
         type:String
    },
    userInfo:[{
        documents:{
            type:Array
        }
        
    }]
   
    // pdis:{
    //     type:String,
    //     // required:true
    // }
})



module.exports = mongoose.model('Loan',data)