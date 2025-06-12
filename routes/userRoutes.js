const express = require('express');
const router = express.Router();
const { registerUser, getUserReferrals } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/:userId/referrals', getUserReferrals);

module.exports = router;
