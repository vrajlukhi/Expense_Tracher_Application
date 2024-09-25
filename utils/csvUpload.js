const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only CSV is allowed'), false);
  }
};

exports.uploadCSV = multer({
  storage: storage,
  fileFilter: fileFilter
});