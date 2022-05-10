const mongoose = require('mongoose')

var url = "mongodb+srv://dshinde:Ds12890@cluster0.ril1i.mongodb.net/rashi-bajaj?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));
