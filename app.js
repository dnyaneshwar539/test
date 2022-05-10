const express = require("express")
const app = express()
const port = process.env.PORT || 6000
const mongodb = require("./src/config/db")
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/upload/products', express.static('./upload/products'));
app.use('/public/exports', express.static('./src/api/public/exports'));
// app.use('/upload/washer', express.static('./upload/washer'));
// app.use('/upload', express.static('./upload'));
app.use(cors());
// Define Route 
const registration_temp = require('./src/api/franchaise/registration_temp')
const admin_user = require('./src/api/admin/admin_user')

const add_product = require('./src/api/admin/admin_temp')

const cus_regis = require('./src/api/customer/cus_regis')


const fasttwosms = require('./src/api/admin/fasttwosms')
const service_item = require('./src/api/customer/service_item')



// const image = require('./src/api/test/image')

// Use Route1````````````````````````````````````
// app.use('/',image)

app.use('/api',registration_temp)
app.use('/api',fasttwosms)
app.use('/api/admin_user',admin_user)
app.use('/api/admin',add_product)
app.use('/api/customer',cus_regis)
app.use('/api/customer',service_item)
app.get('/',(req,res)=>{
    res.send("WELCOME BACK TO WORK :)")
})

app.listen(port,()=>{console.log("Server Start on port "+port)})