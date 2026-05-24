const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Your JWT middleware
const dc = require('../controllers/dataController');

router.get('/auth/me', auth, dc.getMe);
router.get('/meetings', auth, dc.getMeetings);
router.get('/documents', auth, dc.getDocuments);
router.get('/payments', auth, dc.getPayments);
// Add this to your API routes file
router.post('/meetings', auth, async (req, res) => {
    const newMeeting = new Meeting({ ...req.body, userId: req.user.id });
    await newMeeting.save();
    res.json({ success: true });
});
module.exports = router;