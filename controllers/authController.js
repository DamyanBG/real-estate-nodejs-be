const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hash, compare } = require(`bcrypt`);

generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  // validations
  if (!password || !email) {
    res.status(400).json({ error: 'fields can not be empty' });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ error: 'Wrong email or password' });
    return;
  }

  console.log(password);

  const match = await compare(password, user.password);

  if (!match) {
    res.status(400).json({ error: 'Wrong email or password' });
    return;
  }

  const token = await generateToken(user._id);

  res.cookie('token', token),
    {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: 'none',
      secure: true,
    };

  const { _id, first_name, last_name, user_email, phone_number, role } = user;
  res.status(200).json({
    _id,
    first_name,
    last_name,
    user_email,
    phone_number,
    role,
    token,
  });
};

const logoutUser = async (req, res) => {
  console.log("something")
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    expires: new Date(0),
    secure: true,
  });
  return res.status(200).json({ message: 'you have successfully logged out' });
};

module.exports = {
  loginUser,
  logoutUser,
};
