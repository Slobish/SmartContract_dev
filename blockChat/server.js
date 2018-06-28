var express = require('express');
var morgan = require('morgan');

var app = express();
var routes = require('./engine/routes/routes.js');

app.use(express.static("engine")); 
app.use(morgan('short'));  

app.set('appName','blockChat');         // setting name
      
//app.use(routes);

app.get('/', (req, res) => res.sendFile(__dirname+'/engine/index.html'));
app.get('/feeGet', (req, res) => res.sendFile(__dirname+'/engine/feeGet.html'));



var server = app.listen(3000, () => {console.log("Server ON || PORT = "+server.address().port)});
