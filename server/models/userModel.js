const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: 'String', required: true },
    age: { type: 'Number', required: true },
    batch: { type: 'String', required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
