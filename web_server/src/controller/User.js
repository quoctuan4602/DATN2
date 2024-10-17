const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password, fullName } = req.body;

  try {
    const user = await User.findOne({ username });
    const checkpass = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(400).json({ message: 'username or passord invalid' });
    }
    if (!checkpass)
      return res.status(400).json({ message: 'username or passord invalid' });
    const token = jwt.sign(
      {
        username,
        password,
      },
      '123',
    );

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'register err',
    });
  }
};

const register = async (req, res) => {
  console.log('🚀 ~ register ~ req.body;:', req.body);
  const { username, password, fullName } = req.body;

  try {
    const oldUser = await User.findOne({ username });
    if (oldUser)
      return res.status(400).json({
        message: 'Uer have already exit',
      });

    const hashpassWord = await bcrypt.hash(password, 10);
    const newUer = new User({
      username,
      password: hashpassWord,
      fullName,
    });
    const token = jwt.sign(
      {
        username,
        password,
      },
      '123',
    );

    await newUer.save();

    return res.json({
      user: newUer,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'register err',
    });
  }
};

module.exports = {
  login,
  register,
};
