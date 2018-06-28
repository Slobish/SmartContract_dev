var express = require('express');
var router = express.Router();

console.log(__dirname);
router.get('/', (req, res) => res.render(__dirname+'/../index.ejs'));
router.get('/index.js',  (req, res) => res.sendFile(__dirname+'/backend/index.js'));
router.get('/index.css',  (req, res) => res.sendFile(__dirname+'/css/index.css'));
router.get('/feeGet', (req, res) => res.render(__dirname+'/../feeGet.ejs'));
router.get('/feeGet.js',  (req, res) => res.sendFile(__dirname+'/backend/feeGet.js'));
router.get('/feeGet.css',  (req, res) => res.sendFile(__dirname+'/css/feeGet.css'));
router.get('/logo.png',  (req, res) => res.sendFile(__dirname+'/logo.png'));


module.exports = router;