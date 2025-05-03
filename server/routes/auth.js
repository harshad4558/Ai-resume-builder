const router = require('express').Router();
const { User, validate, validateLogin } = require('../models/user');
const bcrypt = require('bcryptjs');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    // Validate input
    const { error } = validate(req.body);
    if (error) {
      console.log('Validation error:', error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log('User already exists:', req.body.email);
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user
    await user.save();
    
    // Generate token
    const token = user.generateAuthToken();
    console.log('User registered successfully:', req.body.email);

    res.status(201).send({ data: token, message: "User registered successfully" });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body.email);
    
    const { error } = validateLogin(req.body);
    if (error) {
      console.log('Login validation error:', error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('Invalid email:', req.body.email);
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log('Invalid password for user:', req.body.email);
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    console.log('User logged in successfully:', req.body.email);
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;