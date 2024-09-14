// script สร้าง Database และสร้างข้อมูลวัว 15 ตัว

const mongoose = require('mongoose');
const WhiteCow = require('./models/whiteCowModel');
const BrownCow = require('./models/brownCowModel');
const PinkCow = require('./models/pinkCowModel');

// function สุ่มอายุวัว (0-10 ปี และสุ่มเดือน)
function getRandomAge() {
  const ageYears = Math.floor(Math.random() * 11); // สุ่มอายุปี (0-10)
  const ageMonths = Math.floor(Math.random() * 12); // สุ่มอายุเดือน (0-11)
  return { ageYears, ageMonths };
}

// function สร้างรหัสวัว (เลข 8 หลักโดยที่เลขตัวแรกไม่ใช่ 0)
async function generateUniqueCowId(CowModel) {
  let isUnique = false;
  let cowId;

  // ตรวจสอบว่ารหัสที่สร้างยังไม่ถูกใช้
  while (!isUnique) {
    const firstDigit = Math.floor(Math.random() * 9) + 1; // เลขหลักแรก (1-9)
    const restDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0'); // เลขที่เหลือ (7 หลัก)
    cowId = `${firstDigit}${restDigits}`;

    // ตรวจสอบว่ามีรหัสนี้ในฐานข้อมูลหรือไม่
    const existingCow = await CowModel.findOne({ cowId });
    if (!existingCow) {
      isUnique = true;
    }
  }

  return cowId;
}

// function สร้างข้อมูลวัวตามพันธุ์
async function createCowsByBreed(CowModel, breed, count) {
  for (let i = 0; i < count; i++) {
    const { ageYears, ageMonths } = getRandomAge();
    const cowId = await generateUniqueCowId(CowModel); // ใช้ฟังก์ชันตรวจสอบรหัสซ้ำ
    const cow = new CowModel({ cowId, breed, ageYears, ageMonths });
    await cow.save();
    console.log(`${breed} cow ${cowId} saved with age ${ageYears} years and ${ageMonths} months.`);
  }
}

// เชื่อมต่อกับ MongoDB และสร้างข้อมูลวัว
mongoose.connect('mongodb://localhost:27017/cow_milk')
.then(async () => {
  console.log('Connected to MongoDB');

  // สร้างข้อมูลวัวตามพันธุ์
  await createCowsByBreed(WhiteCow, 'white', 5);  // วัวสีขาว 5 ตัว
  await createCowsByBreed(BrownCow, 'brown', 5);  // วัวสีน้ำตาล 5 ตัว
  await createCowsByBreed(PinkCow, 'pink', 5);    // วัวสีชมพู 5 ตัว

  console.log('All cows have been saved!');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
