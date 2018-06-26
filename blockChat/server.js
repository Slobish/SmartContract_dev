var express = require('express');
var ejs = require('ejs')
var app = express();


app.set('appName','blockChat');
app.set('views',__dirname+'/frontend')
app.set('view engine','ejs');

app.get('/', (req, res) => res.render(__dirname+'/frontend/index.ejs'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))
