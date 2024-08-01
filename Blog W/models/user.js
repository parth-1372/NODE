const { createHmac , randomBytes } = require('node:crypto');
const { Schema, model } = require('mongoose');
const { createTokenForUser } = require('../service/auth');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: '../public/images/download.png',
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
}, { timestamps: true });

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = randomBytes(16).toString('hex');
  const hashedPass = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

  user.salt = salt;
  user.password = hashedPass;
  next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function (email, inputPassword) {
  const user = await this.findOne({ email });

  if (!user) throw new Error('User Not Found');

  // Use the stored salt from the user document
  const hashedPass = createHmac('sha256', user.salt)
    .update(inputPassword)
    .digest('hex');

  // Compare the hashed input password with the stored hashed password
  if (user.password !== hashedPass) {
    throw new Error('Password Is Incorrect');
  }

  return token = createTokenForUser(user);
};

const User = model('User', userSchema);

module.exports = User;
