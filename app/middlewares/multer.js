const multer = require('multer');

const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +  file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.mimetype === 'application/vnd.ms-excel') {
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
        fileSize: 3000000
    },
    fileFilter: fileFilter
});

module.exports = uploadMiddleware;