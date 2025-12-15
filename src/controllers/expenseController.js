const Expense = require('../models/Expense');

// @desc    Get all expenses for logged-in user
// @route   GET /api/expenses
const getExpenses = async (req, res) => {
  try {
    // filter by the firebase uid attached to req.user
    const expenses = await Expense.find({ userId: req.user.uid }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // ensure the expense belongs to the logged in user
    if (expense.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new expense
// @route   POST /api/expenses
const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const expense = await Expense.create({
      userId: req.user.uid, // attach user id
      title,
      amount,
      category,
      date: date || Date.now()
    });

    res.status(201).json({
      message: 'Expense added successfully',
      id: expense._id,
      expense
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid data provided' });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // check ownership
    if (expense.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // update fields
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: 'Expense updated successfully', expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // check ownership
    if (expense.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};