const express = require("express");
const path = require("path");
const app =express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
  });

const Contact = mongoose.model('contact',contactschema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('views engine','pug')
app.set('views', path.join(__dirname,"views")) 

app.get('/',(req,res)=>{
    res.render('index.pug')

})

app.get('/contact',(req,res)=>{
    res.render('contact.pug')

})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.sender(400).send("this item not saved to the database")
    })
    // res.render('contact.pug')

})


app.listen(port , ()=>{
    console.log(`the listening port at ${port}`)
})