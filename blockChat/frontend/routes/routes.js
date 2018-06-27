var express = require('express');
var router = express.Router();

router.get('/', (req, res) => res.render(__dirname+'/../index.ejs'));
router.get('/backend', (req, res) => res.render(__dirname+'/../backend/index.js'));
router.get('/feeGet', (req, res) => res.render(__dirname+'/../feeGet.ejs'));

module.exports = router;