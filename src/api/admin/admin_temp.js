const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const product = require('../../module/add_product_schema')
const Loan = require('../../module/add_loans_schema')
const service = require('../../module/adm_service')
const bajajdp = require('../../module/bajajdp')
const mahindradp = require('../../module/mahindradp')
const bajajtenure = require('../../module/bajajtenure')
const mahindratenure = require('../../module/mahindratenure')
const loan_cart_schema = require('../../module/adm_loan_schema')
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path")
const fs = require('fs')
var cors = require("cors")
const json2csv = require('json2csv').parse;
const moment = require('moment');

// const imageUpload = multer({
//     storage: multer.diskStorage({
//         // Destination to store image     
//         destination: './upload/products',
//         filename: (req, file, cb) => {
//             cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
//         }
//     })
//     // limits: {
//     //     fileSize: 1000000 * 9 // 1000000 Bytes = 1 MB
//     // }
// })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/products");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  
  var upload = multer({ storage: storage });
  
  var cpUpload = upload.fields([{ name: 'pimage', maxCount: 1 }])

// Product code Start

route.post('/addProduct', cpUpload, (req, res) => {
    const url = "https" + '://' + req.get('host')
    const prod = product({
        pname: req.body.pname,
        pprice: req.body.pprice,
        psale_price: req.body.psale_price,
        pimage: req.body.pimage,
    })

    prod.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            // console.log(err)
            return res.json({ message: "Bad requiest" })
        }
    })

})

route.get('/show_product', (req, res) => {
    product.find((err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
           
        else{
            return res.json({ message: "Bad Request" })
        }
            
    }).sort({$natural:-1});
})



route.get('/export_product_csv', (req, res)=>{
    const fields = ['pname','pimage','pprice','psale_price'];
    const url = "https" + '://' + req.get('host')
    product.find((err, doc)=>{
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
  




route.post('/update_product',(req, res) => {
    const url = "https" + '://' + req.get('host')
    product.updateOne({ _id: req.body.id }, {
        pname: req.body.pname,
        pprice: req.body.pprice,
        psale_price: req.body.psale_price,
        pimage: req.body.pimage
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delet_product/:id', (req, res) => {
    product.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Deleted successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})

// product code End

// service code start

route.post('/addDocumentlist', (req, res) => {
    const serv = service({
        document_name: req.body.document_name,
        rented:req.body.rented,
        owned:req.body.owned
    })

    serv.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ message: "Bad request" })
            // console.log(err)
        }
    })

})

route.post('/show_documentlist', (req, res) => {
    service.find((err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
            
        else{ 
            return res.json({ message: "Bad Request" })
        }
           
    }).sort({$natural:-1});
})

route.post('/show_documentlists', async (req, res) => {
    
    service.find({$or:[{rented:req.body.rented}, {owned:req.body.owned}]},(err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
            
    }).sort({$natural:-1});
})

route.post('/update_documentlist',(req, res) => {
    const url = "https" + '://' + req.get('host')
    service.updateOne({ _id: req.body.id }, {
        document_name: req.body.document_name,
        rented:req.body.rented,
        owned:req.body.owned
    }, (err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
           
        else{
            return res.json({ message: "Bad Request" })
        }
            
    })

})

route.post('/delete_documentlist/:id', (req, res) => {
    service.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err){
            return res.json({ data: "Deleted successfully" })
        }
           
        else{
            return res.json({ message: "Bad Request" })
        }
            
    })
})
//document list ends here

route.post('/addLoan', cpUpload, (req, res) => {
    const url = "https" + '://' + req.get('host')
    const lon = Loan({
        loanname: req.body.loanname,
        dp_type: req.body.dp_type,
        interest_rate: req.body.interest_rate,
        total_amount: req.body.total_amount
    })

    lon.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            // console.log(err)
            return res.json({ message: "Bad requiest" })
        }
    })

})

route.get('/show_loan',  (req, res) => {
    Loan.find((err, doc) => {
        if (!err)
        {
            return res.json({ data: doc })
        }
           
        else{
            return res.json({ message: "Bad Request" })
        }
           
    }).sort({$natural:-1});
})




route.get('/export_laon_csv', (req, res)=>{
    const fields = ['loanname','dp_type','interest_rate'];
    const url = "https" + '://' + req.get('host')
    Loan.find((err, doc)=>{
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



 
route.post('/show_loans', (req, res) => {
    Loan.find({ _id: req.body.id },(err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
            
        else{
            return res.json({ message: "Bad Request" })
        }
           
    }).sort({$natural:-1});
})

route.post('/update_loan',(req, res) => {
    const url = "https" + '://' + req.get('host')
    Loan.updateOne({ _id: req.body.id }, {
        loanname: req.body.loanname,
        dp_type: req.body.dp_type,
        interest_rate: req.body.interest_rate,
        total_amount: req.body.total_amount
    }, (err, doc) => {
        if (!err)
        {
            return res.json({ data: doc })
        }
            
        else{
            return res.json({ message: "Bad Request" })
        }
            
    })

})

route.post('/delet_loan/:id', (req, res) => {
    Loan.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err){
            return res.json({ data: "Deleted successfully" })
        }
           
        else{
            return res.json({ message: "Bad Request" })
        }
            
    })
})





// Loan Options code start

route.post('/add_Loanoptions',(req,res)=>{
    const loan_item = loan_cart_schema({
        loan_id:req.body.loan_id,
        document_id:req.body.document_id,
        document_name:req.body.document_name
           
    })
    // cus_cart_schema.find({ cus_id: req.body.cus_id }, (err, docs) => {
    //     // console.log(doc._id.toString())
        
    //         if (req.body.service_id.toString().str.equals(docs.service_id.toString().str) ) {
    //             return res.json({massege:"Service Already added to Cart"})
    //         }      
    //         else{  

    loan_item.save((err,doc)=>{
        if(!err){
            return res.json({ data:doc })
        }else{
            return res.json({massege:"Bad request"})
        }
    })
//             }
// })
})


route.post('/update_Loanoptions',(req,res)=>{
     
        const url = "https" + '://' + req.get('host')
        Loan.updateOne({ loanname: req.body.loan_id }, {
            userInfo:req.body.userinfo
        }, (err, doc) => {
            if (!err)
                return res.json({ data: doc })
            else
                return res.json({ message: "Bad Request" })
        })
    
    })


route.post('/get_loanoptionlist',(req,res)=>{
    
    loan_cart_schema.find({loan_id:req.body.id},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    })

})

route.post('/get_loanoptionlists',(req,res)=>{
    
    Loan.find({'userInfo.documents':{$nin:req.body.documents}},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    }).sort({$natural:-1});

})


route.post('/delete_loanoption_item',(req,res)=>{
    
    loan_cart_schema.findByIdAndRemove({_id:req.body.id},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    })

})

route.post('/delete_items',(req,res)=>{
    
    loan_cart_schema.deleteMany({loan_id:req.body.id},(err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad requiest"})
        }
    })

})

route.post('/addBajajdp', (req, res) => {
    const bajajd = bajajdp({
        downpayment: req.body.downpayment,
        
    })

    bajajd.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ message: "Bad requiest" })
            // console.log(err)
        }
    })

})

route.post('/show_bajajdp', (req, res) => {
    bajajdp.find((err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/show_bjajdps', (req, res) => {
    bajajdp.find({$or:[{rented:req.body.rented}, {owned:req.body.owned}]},(err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/update_bajajdp',(req, res) => {
    const url = "https" + '://' + req.get('host')
    bajajdp.updateOne({ _id: req.body.id }, {
        downpayment: req.body.downpayment,
       
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delete_bajajdp/:id', (req, res) => {
    bajajdp.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Deleted successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})
//document list ends here

route.post('/addMahindradp', (req, res) => {
    const mahindrad = mahindradp({
        downpayment: req.body.downpayment,
        
    })

    mahindrad.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ message: "Bad requiest" })
            // console.log(err)
        }
    })

})

route.post('/show_mahindradp', (req, res) => {
    mahindradp.find((err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/show_mahindradps', (req, res) => {
    mahindradp.find({$or:[{rented:req.body.rented}, {owned:req.body.owned}]},(err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/update_mahindradp',(req, res) => {
    const url = "https" + '://' + req.get('host')
    mahindradp.updateOne({ _id: req.body.id }, {
        downpayment: req.body.downpayment,
       
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delete_mahindradp/:id', (req, res) => {
    mahindradp.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Deleted successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/addBajajtenure', (req, res) => {
    const bajajt = bajajtenure({
        downpayment: req.body.downpayment,
        tenure: req.body.tenure,
        loan_amount: req.body.loan_amount,
        interest_rate:req.body.interest_rate,
        total_amount:req.body.total_amount,
        emi:req.body.emi,
        saving:req.body.saving
        
    })

    bajajt.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ message: "Bad requiest" })
            // console.log(err)
        }
    })

})






route.get('/export_bajajtenure_csv', (req, res)=>{
    const fields = ['downpayment','tenure','loan_amount','interest_rate','total_amount','emi','saving'];
    const url = "https" + '://' + req.get('host')
    bajajtenure.find((err, doc)=>{
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

route.post('/show_bajajtenure', (req, res) => {
    bajajtenure.find((err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    }).sort({$natural:-1});
})

route.post('/show_bjajtenures', (req, res) => {
    bajajtenure.find({downpayment:req.body.downpayment},(err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/show_bjajtenuress', (req, res) => {
    bajajtenure.find({_id:req.body.id},(err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/update_bajajtenure',(req, res) => {
    const url = "https" + '://' + req.get('host')
    bajajtenure.updateOne({ _id: req.body.id }, {
        downpayment: req.body.downpayment,
        tenure: req.body.tenure,
        loan_amount: req.body.loan_amount,
        interest_rate:req.body.interest_rate,
        total_amount:req.body.total_amount,
        emi:req.body.emi,
        saving:req.body.saving
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delete_bajajtenure/:id', (req, res) => {
    bajajtenure.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Deleted successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})
//document list ends here

route.post('/addMahindratenure', (req, res) => {
    const mahindrat = mahindratenure({
        downpayment: req.body.downpayment,
        tenure: req.body.tenure,
        loan_amount: req.body.loan_amount,
        interest_rate:req.body.interest_rate,
        total_amount:req.body.total_amount,
        emi:req.body.emi,
        saving:req.body.saving
    })

    mahindrat.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ message: "Bad requiest" })
            // console.log(err)
        }
    })

})


route.get('/export_mahindratenure_csv', (req, res)=>{
    const fields = ['downpayment','tenure','loan_amount','interest_rate','total_amount','emi','saving'];
    const url = "https" + '://' + req.get('host')
    mahindratenure.find((err, doc)=>{
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

route.post('/show_mahindratenure', (req, res) => {
    mahindratenure.find((err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/show_mahindratenures', (req, res) => {
    mahindratenure.find({downpayment:req.body.downpayment},(err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })
})

route.post('/show_mahindratenuress', (req, res) => {
    mahindratenure.find({_id:req.body.id},(err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    }).sort({$natural:-1});
})

route.post('/update_mahindratenure',(req, res) => {
    const url = "https" + '://' + req.get('host')
    mahindratenure.updateOne({ _id: req.body.id }, {
        downpayment: req.body.downpayment,
        tenure: req.body.tenure,
        loan_amount: req.body.loan_amount,
        interest_rate:req.body.interest_rate,
        total_amount:req.body.total_amount,
        emi:req.body.emi,
        saving:req.body.saving
    }, (err, doc) => {
        if (!err)
            return res.json({ data: doc })
        else
            return res.json({ message: "Bad Request" })
    })

})

route.post('/delete_mahindratenure/:id', (req, res) => {
    mahindratenure.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err)
            return res.json({ data: "Deleted successfully" })
        else
            return res.json({ message: "Bad Request" })
    })
})


module.exports = route