var express = require('express');
var morgan = require('morgan');

var app = express();
var routes = require('./engine/routes/routes.js');

app.use(express.static("engine")); 
app.use(morgan('short'));  

app.set('appName','blockChat');         // setting name
      
//app.use(routes);

app.get('/', (req, res) => res.sendFile(__dirname+'/engine/index.html'));

app.post('/feeGet', function(req, res) {
    res.sendFile(__dirname+'/engine/feeGet.html');
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
 
    res.send(user_id + ' ' + token + ' ' + geo);
    
 });

var server = app.listen(3000, () => {console.log("Server ON || PORT = "+server.address().port)});
