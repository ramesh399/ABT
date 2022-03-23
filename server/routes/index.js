var express = require('express');
const router = express.Router();

router.use('/createbill', require('./createBill'));

module.exports = router;