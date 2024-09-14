const WhiteCow = require('../models/whiteCowModel');
const BrownCow = require('../models/brownCowModel');
const PinkCow = require('../models/pinkCowModel');

// function คำนวณปริมาณน้ำนมที่ผลิตได้
const calculateMilkProduction = (cow) => {
  const totalMonths = cow.ageYears * 12 + cow.ageMonths;
  let milkProduction = 0;

  if (cow.breed === 'white') {
    milkProduction = 120 - totalMonths; // นมจืด
  } else if (cow.breed === 'brown') {
    milkProduction = 40 - cow.ageYears; // นมช็อกโกแลต
  } else if (cow.breed === 'pink') {
    milkProduction = 30 - cow.ageMonths; // นมสตรอว์เบอร์รี่
  }

  return milkProduction > 0 ? milkProduction : 0;
};

// ฟังก์ชันรับรหัสวัวและค้นหาวัว
exports.getCowData = async (req, res) => {
  const { cowIds } = req.body;  // รับค่า cowIds จากฟอร์ม

  // แยกค่า cowIds ที่รับมาจาก input ด้วยเครื่องหมายคอมม่า
  const cowIdArray = cowIds.split(',').map(id => id.trim());  // แยก ID และลบช่องว่าง

  // ตรวจสอบว่า cowIdArray มีข้อมูลหรือไม่
  if (!cowIdArray || cowIdArray.length === 0) {
    return res.render('index', { error: 'Please provide valid cow IDs', cows: [], totalMilkProduction: 0 });
  }

  try {
    let totalMilkProduction = 0;
    let cows = [];

    // ลูปค้นหาวัวจาก cowIdArray
    for (let cowId of cowIdArray) {
      // ค้นหาวัวจากทั้งสามโมเดล
      let cow = await WhiteCow.findOne({ cowId }) ||
                await BrownCow.findOne({ cowId }) ||
                await PinkCow.findOne({ cowId });

      if (cow) {
        const milkProduction = calculateMilkProduction(cow);  // คำนวณน้ำนมแต่ละตัว
        cow.milkProduction = milkProduction;  // เก็บปริมาณน้ำนมไว้ใน object cow
        cows.push(cow);
        totalMilkProduction += milkProduction;  // คำนวณน้ำนมรวม
      }
    }

    // ถ้าไม่พบวัวเลยให้แจ้งข้อผิดพลาด
    if (cows.length === 0) {
      return res.render('index', { error: 'No cows found for the provided IDs', cows: [], totalMilkProduction: 0 });
    }

    // ส่งข้อมูล cows และปริมาณน้ำนมรวมไปยังหน้า index.ejs
    res.render('index', { cows, totalMilkProduction, error: null });
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'Error retrieving cow data', cows: [], totalMilkProduction: 0 });
  }
};
