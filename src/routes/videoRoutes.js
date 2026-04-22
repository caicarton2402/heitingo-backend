const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/feed', videoController.getFeed);
router.post('/:id/like', videoController.likeVideo);

module.exports = router;
