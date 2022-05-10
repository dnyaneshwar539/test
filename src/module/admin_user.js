const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const data = new mongoose.Schema({

    admin_name:{
        type:String,
        required:true,
        unique:[true,'This username is already taken']
    },
    admin_email:{
        type:String,
        required:true,
        unique:[true,'This email is already exist']
    },
    admin_pass:{
        type:String,
        required:true
    },
    admin_role:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

data.methods.generateAuthToken = function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},"mynameissaifalifarooqueshaikh")
        this.tokens = this.tokens.concat({token:token})
        // await this.save()
        return token
    }catch(error){
        console.log(error)
    }
}

data.pre("save", async function (next) {
    if (this.isModified("admin_pass")) {
        this.admin_pass = await bcrypt.hash(this.admin_pass, 10)
        // this.con_password = await bcrypt.hash(this.con_password, 10)
    }
    next()
})

module.exports = mongoose.model('admin_reg',data)