const express = require('express');
const router = express.Router();
const { processPurchase, getEarningsReport } = require('../controllers/earningsController');

router.post('/purchase', processPurchase);
router.get('/:userId/report', getEarningsReport);

module.exports = router;

