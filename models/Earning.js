const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sourceUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  level: Number,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Earning', earningSchema);
