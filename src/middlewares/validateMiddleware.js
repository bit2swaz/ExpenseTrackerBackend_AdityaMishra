const { check, validationResult } = require('express-validator');

// validation rules for creating or updating an expense
const expenseValidationRules = [
  check('title', 'Title is required').not().isEmpty(),
  check('amount', 'Amount must be a positive number').isFloat({ gt: 0 }),
  check('category', 'Category is required').not().isEmpty(),
  check('date', 'Date must be a valid date').optional().isISO8601().toDate()
];

// middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: errors.array()
    });
  }
  next();
};

module.exports = { expenseValidationRules, validate };