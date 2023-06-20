const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype === 'application/vnd.ms-excel'
  ) {
    cb(null, true);
  } else {
    // reject file
    cb(
      {
        message: 'Unsupported file format',
      },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
}).single('file'); // Ganti 'file' dengan nama field file pada form

// Middleware untuk menghapus file setelah diunggah
const uploadAndDeleteMiddleware = (req, res, next) => {
  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      return res.status(400).json({ msg: 'Unknown error occurred' });
    } if (req.file.path) {
      // fs.unlink(path.join(__dirname, '..', '..',  'public', 'uploads', req.file.filename), function (error) {
      //   if (error) {
      //     console.log('Failed to delete the file:', error);
      //   }
      // });
    }
    next();
    
  });
};

module.exports = uploadAndDeleteMiddleware;
