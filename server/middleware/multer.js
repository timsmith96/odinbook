const multer = require('multer');

// set up multer middleware
const fileStorageEngine = multer.memoryStorage();

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;

// {
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// }
