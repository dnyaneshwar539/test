const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const regi = require('../../module/admin_user')

const bcrypt = require("bcrypt")
const session = require("express-session")
const cookieParser = require("cookie-parser")

var cors = require("cors")
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
        admin_name: req.body.admin_name,
        admin_email: req.body.admin_email,
        admin_pass: req.body.admin_pass,
        admin_role: req.body.admin_role
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


route.get('/export_user_csv', (req, res)=>{
    const fields = ['admin_name','admin_email','admin_pass','admin_role'];
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
  

route.post('/get_admin_user', (req, res) => {
    regi.find((err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    }).sort({$natural:-1});
})

route.post('/countadmin_user',(req,res)=>{

    regi.count((err,doc)=>{
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/update_admin_user',(req, res) => {
    const url = "https" + '://' + req.get('host')
    regi.updateOne({ _id: req.body.id }, {
        admin_name: req.body.admin_name,
        admin_email: req.body.admin_email,
        admin_role: req.body.admin_role
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delete_admin_user/:id', (req, res) => {
    regi.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Delet successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})


route.post('/login', async (req, res) => {

    regi.findOne({ admin_email: req.body.admin_email }, (err, doc) => {
        // console.log(doc._id.toString())
        bcrypt.compare(req.body.admin_pass, doc.admin_pass, (err, rus) => {
            if (rus) {
                req.session.admin_id = doc._id.toString()
                // console.log(req.session.admin_id)
                return res.json({ data: [doc] })
            } else {
                return res.json({ massege: "Bad Request" })
            }
        })
    })

})

route.post('/forgot', (req, res) => {

    regi.findOne({ admin_email: req.body.admin_email }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ massege: "Bad Requiset" })
    })

})


module.exports = route
