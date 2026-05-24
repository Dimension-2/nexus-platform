// controllers/uploadController.js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.uploadFile = (req, res) => {
    // req.file contains your document
    const fileData = {
        name: req.file.originalname,
        path: req.file.path,
        userId: req.user.id
    };
    // Save fileData to MongoDB here...
    res.json({ success: true, message: "File Uploaded" });
};