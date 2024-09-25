const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cash', 'credit'], required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;