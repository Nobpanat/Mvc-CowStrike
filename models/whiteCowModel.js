// /models/whiteCowModel.js
const mongoose = require('mongoose');

const whiteCowSchema = new mongoose.Schema({
  cowId: { type: String, required: true, unique: true },
  breed: { type: String, default: 'white', required: true },
  ageYears: { type: Number, required: true },
  ageMonths: { type: Number, required: true }
}, { collection: 'cows' });  // ใช้ collection เดียวกัน

const WhiteCow = mongoose.model('WhiteCow', whiteCowSchema);
module.exports = WhiteCow;
