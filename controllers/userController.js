const User = require('../models/userModel');

exports.saveCompanyDetails = async (req, res) => {
  const { userId, companyName, accessCode } = req.body;

  try {
    const user = new User({ userId, companyName, accessCode });
    await user.save();
    res.status(200).send('Company details saved');
  } catch (error) {
    res.status(500).send('Error saving company details');
  }
};

exports.checkCompanyVerification = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });
    if (user) {
      res.status(200).json({ isVerified: true });
    } else {
      res.status(200).json({ isVerified: false });
    }
  } catch (error) {
    res.status(500).send('Error checking company verification');
  }
};
