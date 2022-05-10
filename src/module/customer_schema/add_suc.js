const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    cus_first_name:{
    type:String,
    // required:true
    },
    cus_last_name:{
        type:String,
        // required:true
    },
    cus_mobile_no:{
        type:String,
        // required:true
    },
    cus_first_vehicle:{
        type:String, 
        // required:true       
    },
    cus_experience:{
        type:String, 
        // required:true      
    },
    cus_vehicle:{
        type:String, 
        // required:true        
    },
    cus_own_house:{
        type:String,  
        // required:true      
    },
    cus_product:{
        type:String,  
        // required:true      
    },
    user_type:{
        type:String
    },
    downpayment:{
        type:String
        
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
   bank:{
       type:String
   },
   initial_dp:{
       type:String
   }    
      
})

module.exports = mongoose.model('cus_regis',data)