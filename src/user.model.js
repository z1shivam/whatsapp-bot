const {model, Schema} = require('mongoose');

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  remainingQuota: {
    type: Number,
    default: 50,
  },
});

const User = model('User', userSchema);

module.exports = User;