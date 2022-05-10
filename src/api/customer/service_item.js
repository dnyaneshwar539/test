const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const regi = require('../../module/franchaise')
const bcrypt = require("bcrypt")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const adm_service = require('../../module/adm_service')
const cus_cart_schema = require('../../module/cus_cart_schema')


route.use(express.json())
route.use(express.urlencoded({ extended: false }))

route.post('/add_document',(req,res)=>{
    const service_item = cus_cart_schema({
        cus_id:req.body.cus_id,
        document_id:req.body.document_id,
        document_name:req.body.document_name
           
    })
    // cus_cart_schema.find({ cus_id: req.body.cus_id }, (err, docs) => {
    //     // console.log(doc._id.toString())
        
    //         if (req.body.service_id.toString().str.equals(docs.service_id.toString().str) ) {
    //             return res.json({massege:"Service Already added to Cart"})
    //         }      
    //         else{  

    service_item.save((err,doc)=>{
        if(!err){
            return res.json({ data:[doc] })
        }else{
            return res.json({massege:"Bad request"})
        }
    })
//             }
// })
})


route.post('/update_document',(req,res)=>{
  
    cus_cart_schema.findByIdAndUpdate({_id:req.body.item_id},{
        cus_id:req.body.cus_id,
        document_id:req.body.document_id,
        document_name:req.body.document_name
        
    },(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    })

})

route.post('/get_cus_documentlist',(req,res)=>{
    
    cus_cart_schema.find({cus_id:req.body.id},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    })

})



route.post('/delete_document_item',(req,res)=>{
    
    cus_cart_schema.findByIdAndRemove({_id:req.body.id},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    })

})

route.post('/delete_items',(req,res)=>{
    
    cus_cart_schema.deleteMany({cus_id:req.body.id},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad requiest"})
        }
    })

})



module.exports = route