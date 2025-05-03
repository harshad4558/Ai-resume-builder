const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Check for JWT secret key
if (!process.env.JWTPRIVATEKEY) {
  console.error('FATAL ERROR: JWTPRIVATEKEY is not defined.');
  // In production, you might want to exit the process
  // process.exit(1);
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
  try {
    // If JWT key is missing, log an error but don't crash
    if (!process.env.JWTPRIVATEKEY) {
      console.error('ERROR: JWTPRIVATEKEY is missing. Cannot generate token.');
      return null;
    }
    
    const token = jwt.sign(
      { _id: this._id, email: this.email },
      process.env.JWTPRIVATEKEY,
      { expiresIn: '100d' }
    );
    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    return null;
  }
};

const User = mongoose.model('User', userSchema);

// Main validation function for user data
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// Separate validators for login
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate, validateLogin };