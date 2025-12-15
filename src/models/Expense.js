const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: String, // storing the firebase uid here
    required: true,
    index: true // indexing for faster queries by user
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive amount']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Expense', ExpenseSchema);