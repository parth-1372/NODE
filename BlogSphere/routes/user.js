const { Router } = require("express");
const User = require('../models/user');
const { createHmac, randomBytes } = require('node:crypto');
const router = Router();

// Render Sign-In Page
router.get('/signin', (req, res) => {
  res.render("signin");
});

// Render Sign-Up Page
router.get('/signup', (req, res) => {
  res.render("signup");
});

// Handle Sign-In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    res.render('signin', { error: "Incorrect email or password" });
  }
});

// Handle Sign-Up
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: "Email already in use" });
    }

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password
    });

    // Optionally log in the user immediately after signing up
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('signup', { error: "Error creating account. Please try again." });
  }
});

// Handle Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
