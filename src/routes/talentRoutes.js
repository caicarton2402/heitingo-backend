const express = require('express');
const router = express.Router();
const talentController = require('../controllers/talentController');

router.get('/list', talentController.listTalents);
router.get('/:id/link', talentController.getJumpLink);

module.exports = router;
