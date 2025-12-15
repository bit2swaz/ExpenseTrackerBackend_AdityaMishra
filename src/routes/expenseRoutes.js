const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { expenseValidationRules, validate } = require('../middlewares/validateMiddleware');
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

// apply protection to all routes in this file
router.use(protect);

// routes
router.route('/')
  .get(getExpenses) // GET /api/expenses
  .post(expenseValidationRules, validate, createExpense); // POST /api/expenses (with validation)

router.route('/:id')
  .get(getExpenseById) // GET /api/expenses/:id
  .put(expenseValidationRules, validate, updateExpense) // PUT /api/expenses/:id
  .delete(deleteExpense); // DELETE /api/expenses/:id

module.exports = router;