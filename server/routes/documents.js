const express = require('express');
const router = express.Router();
const multer = require('multer');
const Document = require('../models/Document');

const upload = multer({ dest: 'uploads/' });

// Get all docs
router.get('/', async (req, res) => {
    try {
        const docs = await Document.find().sort({ createdAt: -1 });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newDoc = new Document({
            name: req.body.name,
            type: req.body.type,
            size: req.file.size
        });
        await newDoc.save();
        res.status(200).json(newDoc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;