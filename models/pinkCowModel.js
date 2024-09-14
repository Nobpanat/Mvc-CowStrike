// /models/pinkCowModel.js
const mongoose = require('mongoose');

const pinkCowSchema = new mongoose.Schema({
  cowId: { type: String, required: true, unique: true },
  breed: { type: String, default: 'pink', required: true },
  ageYears: { type: Number, required: true },
  ageMonths: { type: Number, required: true }
}, { collection: 'cows' });  // ใช้ collection เดียวกัน

const PinkCow = mongoose.model('PinkCow', pinkCowSchema);
module.exports = PinkCow;
