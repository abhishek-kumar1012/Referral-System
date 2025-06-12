const User = require('../models/User');
const Earning = require('../models/Earning');
const { sendEarningUpdate } = require('../sockets/earningsSocket');

exports.processPurchase = async (req, res) => {
  try {
    const { buyerId, amount } = req.body;
    if (amount <= 1000) return res.status(200).json({ message: 'Amount must be > 1000' });

    const buyer = await User.findById(buyerId);
    const level1 = await User.findById(buyer.referredBy);
    const level2 = level1 ? await User.findById(level1.referredBy) : null;

    if (level1) {
      const amt1 = amount * 0.05;
      const earn1 = await Earning.create({ user: level1._id, sourceUser: buyerId, level: 1, amount: amt1 });
      sendEarningUpdate(level1._id.toString(), earn1);
    }
    if (level2) {
      const amt2 = amount * 0.01;
      const earn2 = await Earning.create({ user: level2._id, sourceUser: buyerId, level: 2, amount: amt2 });
      sendEarningUpdate(level2._id.toString(), earn2);
    }

    res.status(200).json({ message: 'Earnings distributed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEarningsReport = async (req, res) => {
  const userId = req.params.userId;
  const earnings = await Earning.find({ user: userId }).populate('sourceUser');
  res.json(earnings);
};
// exports.getEarningsReport = async (req, res) => {
//   res.json({ working: true, userId: req.params.userId });
// };

