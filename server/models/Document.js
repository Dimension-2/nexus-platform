const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);