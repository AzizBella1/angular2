const express = require('express');
const multer = require('multer');

const app = express();

// Set up multer middleware to handle multipart/form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// API endpoint for file upload

app.post('/', upload.single('image'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.get('/home', (req, res) => {
  res.json('File uploaded successfully!');
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
