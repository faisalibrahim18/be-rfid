const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' +
      (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
      currentDate.getDate().toString().padStart(2, '0');
    const formattedTime = currentDate.getHours().toString().padStart(2, '0') + '-' +
      currentDate.getMinutes().toString().padStart(2, '0') + '-' +
      currentDate.getSeconds().toString().padStart(2, '0');
    const filename = formattedDate + '-' + formattedTime + '-' + file.originalname;
    cb(null, filename);
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
}).single('file');

const uploadAndDeleteMiddleware = (req, res, next) => {
  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      return res.status(400).json({ msg: 'Unknown error occurred' });
    } if (req.file) {
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
