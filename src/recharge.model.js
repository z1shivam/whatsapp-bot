const {model, Schema} = require('mongoose');

const rechargeSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Recharge = model('Recharge', rechargeSchema);

module.exports = Recharge;