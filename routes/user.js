const express = require('express');
const { saveCompanyDetails, checkCompanyVerification } = require('../controllers/userController');

const router = express.Router();

router.post('/saveCompanyDetails', saveCompanyDetails);
router.get('/checkCompanyVerification/:userId', checkCompanyVerification);

module.exports = router;
