const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, referredByCode } = req.body;
    let referredByUser = null;

    if (referredByCode) {
      referredByUser = await User.findOne({ referralCode: referredByCode });
      if (!referredByUser || referredByUser.referrals.length >= 8) {
        return res.status(400).json({ message: 'Invalid referral code or limit exceeded' });
      }
    }

    const newUser = new User({
      name,
      email,
      referralCode: Math.random().toString(36).substring(2, 10),
      referredBy: referredByUser?._id,
    });
    await newUser.save();

    if (referredByUser) {
      referredByUser.referrals.push(newUser._id);
      await referredByUser.save();
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserReferrals = async (req, res) => {
  const user = await User.findById(req.params.userId).populate('referrals');
  res.json(user?.referrals || []);
};
