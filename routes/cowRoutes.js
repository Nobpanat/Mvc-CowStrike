const express = require('express');
const cowController = require('../controllers/cowController');

const router = express.Router();

// Route หน้าแรกและการรับรหัสวัว
router.get('/', (req, res) => {
  res.render('index', { error: null, cows: [], totalMilkProduction: 0 });
});

// Route post รหัสวัวส่งไป contrller
router.post('/cow', cowController.getCowData);

module.exports = router;
