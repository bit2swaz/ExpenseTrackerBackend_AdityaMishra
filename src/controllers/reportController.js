const Expense = require('../models/Expense');
const mongoose = require('mongoose');

// @desc    get monthly expense summary (total & category-wise)
// @route   GET /api/reports/monthly?month=MM&year=YYYY
const getMonthlyReport = async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ message: 'Please provide month and year' });
  }

  try {
    const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JS
    const endDate = new Date(year, month, 0, 23, 59, 59); // last day of month

    const report = await Expense.aggregate([
      // 1. match user and date range
      {
        $match: {
          userId: req.user.uid,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      // 2. run two parallel calculations (total vs categories)
      {
        $facet: {
          totalExpenses: [
            {
              $group: {
                _id: null,
                total: { $sum: '$amount' }
              }
            }
          ],
          categoryBreakdown: [
            {
              $group: {
                _id: '$category',
                total: { $sum: '$amount' }
              }
            }
          ]
        }
      }
    ]);

    // format the output to match requirements exactly
    const result = report[0];
    const total = result.totalExpenses[0] ? result.totalExpenses[0].total : 0;
    
    // convert array to object: { "Food": 2000, "Travel": 500 }
    const categories = {};
    result.categoryBreakdown.forEach(item => {
      categories[item._id] = item.total;
    });

    res.json({ total, categories });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    get expenses filtered by category
// @route   GET /api/reports/category?category=Food
const getCategoryReport = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: 'Please provide a category' });
  }

  try {
    // simple filter query
    const expenses = await Expense.find({
      userId: req.user.uid,
      category: category
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getMonthlyReport, getCategoryReport };