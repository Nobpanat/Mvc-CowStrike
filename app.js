const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

//routes
const cowRoutes = require('./routes/cowRoutes');

const app = express();

// ตั้งค่า view engine เป็น ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ใช้ body-parser สำหรับอ่านค่าจาก form
app.use(bodyParser.urlencoded({ extended: true }));

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/cow_milk')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ใช้ cowRoutes สำหรับการจัดการ route
app.use('/', cowRoutes);

// เริ่ม server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
