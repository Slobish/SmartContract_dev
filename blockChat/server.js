var express = require('express');
var morgan = require('morgan');
var ejs = require('ejs');
var app = express();
var routes = require('./frontend/routes/routes.js');

app.set('appName','blockChat');         // setting name
app.set('views',__dirname+'/frontend')  // htmls
app.set('view engine','ejs');           // engine to show htmls

app.use(morgan('short'));               
app.use(routes);

app.listen(3000, () => {console.log("Server ON")});
