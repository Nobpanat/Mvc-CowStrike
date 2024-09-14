// /models/brownCowModel.js
const mongoose = require('mongoose');

const brownCowSchema = new mongoose.Schema({
  cowId: { type: String, required: true, unique: true },
  breed: { type: String, default: 'brown', required: true },
  ageYears: { type: Number, required: true },
  ageMonths: { type: Number, required: true }
}, { collection: 'cows' });  // ใช้ collection เดียวกัน

const BrownCow = mongoose.model('BrownCow', brownCowSchema);
module.exports = BrownCow;
