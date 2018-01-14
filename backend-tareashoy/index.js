'use strict'
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
let p = require('./config/port');
let c = require('./config/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Conect to database mysql
c.co;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});




//user find and create
let user = require('./routes/user');

app.use('/user', user);


app.listen(p(), () => {
	console.log('Server Ready');
});