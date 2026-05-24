const Meeting = require('../models/Meeting');
const Document = require('../models/Document');
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

exports.getMeetings = async (req, res) => {
    const data = await Meeting.find({ userId: req.user.id });
    res.json(data);
};

exports.getDocuments = async (req, res) => {
    const data = await Document.find({ userId: req.user.id });
    res.json(data);
};

exports.getPayments = async (req, res) => {
    const data = await Payment.find({ userId: req.user.id });
    res.json(data);
};