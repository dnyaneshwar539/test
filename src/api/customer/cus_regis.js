const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const customer_feedback = require('../../module/customer_feedback_schema')
const regi = require('../../module/customer_schema/add_suc')
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path")
const fs = require('fs')
const json2csv = require('json2csv').parse;
const moment = require('moment');

route.post('/add_customer',(req, res)=>{

const addcus = regi({
        cus_first_name:req.body.cus_first_name,
        cus_last_name:req.body.cus_last_name,
        cus_mobile_no:req.body.cus_mobile_no,
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        initial_dp:req.body.initial_dp      
    })
   addcus.save((err,doc)=>{
        if(!err){
            return res.json({ data:[doc] })
        }else{
            return res.json({massege:"Bad request"})
        }
    })
})



route.post('/update_customer',(req, res) => {

   const url = "https" + '://' + req.get('host')

   const FTU = "FTU";
   var no = "no";
   var yes = "yes";
   var ye = "0 Years";
   var yee = "1 to 3 Years";
   var yeee = "3 to 5 Years";
   var yeeee = "5+ Years";

   if(req.body.cus_first_vehicle === yes && req.body.cus_experience === ye){
    
    regi.updateOne({ _id: req.body.id }, {
      
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        cus_product:req.body.cus_product,
        user_type:FTU,
        initial_dp:req.body.initial_dp   
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
   }

   else if(req.body.cus_first_vehicle === yes && req.body.cus_experience === yee){
    const FTB = "FTB";
    regi.updateOne({ _id: req.body.id }, {
       
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        cus_product:req.body.cus_product,
        user_type:FTB,
        initial_dp:req.body.initial_dp   
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: [doc] })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
   }

   else if(req.body.cus_first_vehicle === yes && req.body.cus_experience === yeee){
    const FTB = "FTB";
    regi.updateOne({ _id: req.body.id }, {
       
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        cus_product:req.body.cus_product,
        user_type:FTB,
        initial_dp:req.body.initial_dp   
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: [doc] })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
   }

   else if(req.body.cus_first_vehicle === yes && req.body.cus_experience === yeeee){
    const FTB = "FTB";
    regi.updateOne({ _id: req.body.id }, {
       
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        cus_product:req.body.cus_product,
        user_type:FTB,
        initial_dp:req.body.initial_dp   
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: [doc] })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
   }
   else{
    const RTB = "RTB";
    regi.updateOne({ _id: req.body.id }, {
       
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        cus_product:req.body.cus_product,
        user_type:RTB,
        initial_dp:req.body.initial_dp   
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: [doc] })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
   }

  
    
})


route.post('/update_customers',(req, res) => {
    const url = "https" + '://' + req.get('host')
    regi.updateOne({ _id: req.body.id }, {
        cus_first_vehicle:req.body.cus_first_vehicle,
        cus_experience:req.body.cus_experience,
        cus_vehicle:req.body.cus_vehicle,
        cus_own_house:req.body.cus_own_house,
        initial_dp:req.body.initial_dp   
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/update_customerss',(req, res) => {
    const url = "https" + '://' + req.get('host')
    regi.updateOne({ _id: req.body.id }, {
        downpayment: req.body.downpayment,
        tenure: req.body.tenure,
        loan_amount: req.body.loan_amount,
        interest_rate:req.body.interest_rate,
        total_amount:req.body.total_amount,
        emi:req.body.emi,
        saving:req.body.saving,
        bank:req.body.bank
        
    }, (err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})



route.post('/delete_customer/:id', (req, res) => {
    regi.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err){
            return res.json({ data: "Deleted successfully" })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
})

route.post('/login', async (req, res) => {

    regi.findOne({ cus_mobile_no: req.body.cus_mobile_no }, (err, doc) => {
        // console.log(doc._id.toString())
        // bcrypt.compare(req.body.cus_password, doc.cus_password, (err, rus) => {
            if (doc) {
                req.session._id = doc._id.toString()
                 console.log(req.session._id)
                return res.json({ data: [doc], massege: "Login successfully"  })
            } else {
                return res.json({ massege: "Bad Requiset" })
            }
        })
    })



route.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy(()=>{
    res.status(200).json({
      status: 'Bye!'
    });
  })
  });

route.post('/get_customer',(req,res)=>{

    regi.find((err,doc)=>{
        if(!err){
            return res.json({data:doc})
        }else{
            return res.json({massege:"Bad request"})
        }
    }).sort({$natural:-1})

})


const fields = ['cus_first_name','cus_last_name','cus_mobile_no','cus_first_vehicle','initial_dp','cus_experience','cus_vehicle','cus_own_house','cus_product','user_type','downpayment','tenure','loan_amount','interest_rate','total_amount','emi','saving','bank'];
route.get('/export_csv', (req, res)=>{
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
  






// //For unique file name
// const dateTime = new Date().toISOString().slice(-24).replace(/\D/g, 
// '').slice(0, 14); 

// const filePath = path.join(__dirname, "../../../", "public", "exports", "csv-" + dateTime + ".csv");

// let csv; 

// const student = regi.find((err,doc)=>{
//     if(!err){
//         return res.json({data:doc}).toArray();
        
//     }else{
//         return res.json({massege:"Bad request"})
//     }
// });


// const fields = ['cus_first_name','cus_last_name','cus_mobile_no','cus_first_vehicle','cus_experience','cus_vehicle','cus_own_house','cus_product','user_type','downpayment','tenure','loan_amount','interest_rate','total_amount','emi','saving','bank'];

// route.post('/export_csv',(req,res)=>{
//  try {
    
//         csv = json2csv(student, {fields});
//     } catch (err) {
//         return res.status(500).json({err});
//     }
// });
//  fs.writeFile(filePath, csv, function (err) {
//         if (err) {
//             return res.json(err).status(500);
//         }
//         else {
//             setTimeout(function () {
//                 fs.unlink(filePath, function (err) { // delete this file after 30 seconds
//                 if (err) {
//                     console.error(err);
//                 }
//                 console.log('File has been Deleted');
//             });

//         }, 300000);
//             res.download(filePath);
//         }
//     })







route.post('/countCustomer',(req,res)=>{

    regi.count((err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})



route.post('/countCustomerftu',(req,res)=>{
    const FTUS = "FTU";
    regi.find({ user_type: FTUS }).count((err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/countCustomerftb',(req,res)=>{
    const FTBS = "FTB";
    regi.count({ user_type: FTBS },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/countCustomerrtb',(req,res)=>{
    const RTBS = "RTB";
    regi.count({ user_type: RTBS },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/countCustomerownhouse',(req,res)=>{
    const OWN = "yes";
    regi.count({ cus_own_house: OWN },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})


route.post('/countCustomercompact',(req,res)=>{
    const COMPACT = "Compact RE";
    regi.count({ cus_vehicle: COMPACT },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})


route.post('/countCustomermaximac',(req,res)=>{
    const MAXIMAC = "Maxima C";
    regi.count({ cus_vehicle: MAXIMAC },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})


route.post('/countCustomermaximaz',(req,res)=>{
    const MAXIMAZ = "Maxima Z";
    regi.count({ cus_vehicle: MAXIMAZ },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})


route.post('/countCustomerqute',(req,res)=>{
    const QUTE = "Qute";
    regi.count({ cus_vehicle: QUTE },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})


route.post('/countCustomerxwide',(req,res)=>{
    const XWIDE = "X Wide";
    regi.count({ cus_vehicle: XWIDE },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/countCustomerbajaj',(req,res)=>{
    const BAJAJ = "Bajaj Finance Limited";
    regi.count({ bank: BAJAJ },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/countCustomermahindra',(req,res)=>{
    const MAHINDRA = "Mahindra Finance Limited";
    regi.count({ bank: MAHINDRA },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})

route.post('/countCustomerindusind',(req,res)=>{
    const INDUS = "IndusInd Bank";
    regi.count({ bank: INDUS },(err,doc)=>{
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })

})




route.post('/addcustomer_feedback', (req, res) => {
    const customer_feed = customer_feedback({
        order_id: req.body.order_id,
        customer_name: req.body.customer_name,
        washer_name: req.body.washer_name,
        rating: req.body.rating,
        comment: req.body.comment
       
    
    })

    customer_feed.save((err, doc) => {
        if (!err) {
            return res.json({ data: doc })
        } else {
            return res.json({ message: "Bad requiest" })
            // console.log(err)
        }
    })

})

route.post('/show_customer_feedback', (req, res) => {
    customer_feedback.find((err, doc) => {
        if (!err){
            return res.json({ data: doc })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    }).sort({$natural:-1});
})

route.post('/delete_customer_feedback/:id', (req, res) => {
    customer_feedback.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (!err){
            return res.json({ data: "Delet successfully" })
        }
        else{
            return res.json({ message: "Bad Request" })
        }
    })
})


module.exports = route