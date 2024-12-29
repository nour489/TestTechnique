const multer = require("multer");
const path = require("path");

// Define storage settings for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save images in the 'uploads' folder in the project directory
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Define the image filename as the original name with a timestamp to avoid name collisions
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1634534532.jpg
  },
});

// Create the upload middleware with defined storage settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only allow image files (jpg, jpeg, png, gif)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Only image files are allowed!");
    }
  },
});

module.exports = upload;
