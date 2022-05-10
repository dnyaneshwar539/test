const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const regi = require('../../module/franchaise')
const bcrypt = require("bcrypt")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const adm_service = require('../../module/adm_service')
var cors = require("cors")
const json2csv = require('json2csv').parse;
const moment = require('moment');
const path = require("path")
const fs = require('fs')
route.use(express.json())
route.use(express.urlencoded({ extended: false }))

route.use(cookieParser())
route.use(session({
    secret: "bajajloanappbajajloanapp",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

route.post('/sign_up', (req, res) => {

    const reg = new regi({
        executive_name: req.body.executive_name,
        executive_email: req.body.executive_email,
        executive_pass: req.body.executive_pass
    })

    reg.generateAuthToken()

    reg.save((err, doc) => {
        // console.log(doc)
        if (!err) {
            return res.status(200).json({
                data: doc
            })
        } else {
            return res.status(400).json({
                message: 'Bad Request'
            });
        }
    })

})


route.get('/export_executive_csv', (req, res)=>{
    const fields = ['executive_name','executive_email','executive_pass'];
    const url = "https" + '://' + req.get('host')
    regi.find((err, doc)=>{
      if (err) {
        return res.status(500).json({ err });
      }
      else {
        let csv
        try {
          csv = json2csv(doc, { fields });
        } catch (err) {
          return res.status(500).json({ err });
        }
        const dateTime = moment().format('YYYYMMDDhhmmss');
        const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          else {
            setTimeout(function () {
              fs.unlinkSync(filePath); // delete this file after 30 seconds
            }, 300000)
            return res.json(url+"/public/exports/csv-" + dateTime + ".csv");
          }
        });
  
      }
    })
  })

route.post('/get_executives', (req, res) => {
    regi.find((err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    }).sort({$natural:-1});
})

route.post('/get_executive_indi',(req,res)=>{
   regi.find({_id:req.body.fran_id},(err,doc)=>{
        if(!err){
            return res.json({
                data:doc
            })
        }else{  
            return res.json({message:"Wrong"})
        }
    }).sort({$natural:-1});
})



route.post('/countFranchaise',(req,res)=>{

    regi.count((err,doc)=>{
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/update_executive',(req, res) => {
    const url = "https" + '://' + req.get('host')
    regi.updateOne({ _id: req.body.id }, {
        executive_name: req.body.executive_name,
        executive_email: req.body.executive_email
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delete_executive/:id', (req, res) => {
    regi.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Deleted successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})


route.post('/login', async (req, res) => {

    regi.findOne({executive_email:req.body.executive_email}, (err, doc) => {
        // console.log(doc._id.toString())
    if(doc)  {
        bcrypt.compare(req.body.executive_pass, doc.executive_pass, (err, rus) => {
            if (rus) {
                req.session.executive_id = doc._id.toString()
                // console.log(req.session.fran_id)
                return res.json({ data: [doc] })
            } else {
                return res.json({ massege: "Bad Requiset" })
            }
        })
    } 
    else {
        return res.json({ massege: "Bad Requiset" })
    }
     
    })

})

route.post('/forgot', (req, res) => {

    regi.findOne({ executive_email: req.body.executive_email }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ massege: "Bad Requiset" })
    })

})

route.post('/manage_services', (req, res) => {

    const fran_ser = f_service({
        fan_id: req.body.fan_id,
        service_id: req.body.service_id,
        fan_service_name: req.body.fan_service_name,
        fan_service_price: req.body.fan_service_price
    })

    fran_ser.save((err, doc) => {
        if (!err) {
            return res.json({ data:[doc] })
        } else {
            return res.json({ massege: "Bad request" })
        }
    })

})

route.post('/update_services', (req, res) => {

    f_service.updateOne({_id:req.body.ser_id},{
        fan_service_price: req.body.fan_service_price
    },(err,doc)=>{
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ massege: "Bad request" })
        }
    })    

})

route.post('/fran_services', (req, res) => {
  
    f_service.find({fan_id:req.body.fran_id},(err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ massege: "Bad requiest" })
        }
    }).sort({$natural:-1});
})

route.post('/delete_fran_services',(req,res)=>{

    f_service.findByIdAndRemove({_id:req.body.id},(err,doc)=>{
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

module.exports = route
