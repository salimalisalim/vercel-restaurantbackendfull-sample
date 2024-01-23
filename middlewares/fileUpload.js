const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/restaurants/images") // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    },
  });

const upload = multer({ storage });

module.exports = upload;