const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  year: Number,
  month: Number,
  day: Number,
  yearMonth: {
    type: String,
    required: true
  },
  yearMonthDay: String,
  type: {
    type: String,
    required: true
  },
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
