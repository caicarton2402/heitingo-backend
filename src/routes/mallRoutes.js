const express = require('express');
const router = express.Router();
const mallController = require('../controllers/mallController');

router.get('/products', mallController.listProducts);
router.post('/order', mallController.createOrder);

module.exports = router;
