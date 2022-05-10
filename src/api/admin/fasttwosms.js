var express = require("express");
const route = express.Router()
const mongoose = require('mongoose')
var unirest = require("unirest");
var request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");


// var unirest = require("unirest");

// var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

// req.headers({
//   "authorization": "YOUR_API_KEY"
// });

// req.form({
//   "variables_values": "5599",
//   "route": "otp",
//   "numbers": "9999999999,8888888888,7777777777",
// });

// req.end(function (res) {
//   if (res.error) throw new Error(res.error);

//   console.log(res.body);
// });

// GET Request for sending OTP to a number
route.post("/sendOTP", (req, res) => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  request.headers({
    authorization: "N2WvepJ1IZyHP5489z7oKSuMEgnhb3w6BtilsQc0xTLdXYOFUVHv27D68y9btGZEanVKsYXPpmFuB4Ig"
  
  });

  request.form({
    sender_id: "", // Set your own "sender_id"
    message: "Your OTP for Bajaj Loan Rashi App use is :"+OTP, // template id
    language: "english",
    route: "v3", // Transactional Route SMS
    variables: "{#AA#}",
    variables_values: OTP,
    numbers: req.body.number // Number present in GET request
  });

  request.end(function(res) {
    if (res.error) console.log("error at otp");

    console.log(res.body);
  });
  // response send back
  res.send({
    Number: req.body.number,
    OTP: OTP
  });
});


module.exports = route