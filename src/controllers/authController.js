const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, nickname, inviter_id } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set distribution hierarchy if inviter exists
    let grand_inviter_id = null;
    if (inviter_id) {
      const inviter = await User.findByPk(inviter_id);
      if (inviter) grand_inviter_id = inviter.inviter_id;
    }

    const user = await User.create({
      username,
      password: hashedPassword,
      nickname,
      inviter_id,
      grand_inviter_id
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role, level: user.level } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
