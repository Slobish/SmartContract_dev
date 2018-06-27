var express = require('express');
var router = express.Router();

console.log(__dirname);
router.get('/', (req, res) => res.render(__dirname+'/../index.ejs'));
router.get('/index.js',  (req, res) => res.sendFile(__dirname+'/index.js'));
router.get('/index.css',  (req, res) => res.sendFile(__dirname+'/index.css'));
router.get('/feeGet', (req, res) => res.render(__dirname+'/../feeGet.ejs'));

module.exports = router;