const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { getMonthlyReport, getCategoryReport } = require('../controllers/reportController');

router.use(protect); // ensure all report routes are protected

router.get('/monthly', getMonthlyReport);
router.get('/category', getCategoryReport);

module.exports = router;