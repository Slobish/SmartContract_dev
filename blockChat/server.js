var express = require('express');
var app = express();

app.get('/', (req, res) => res.send('Hola'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))
