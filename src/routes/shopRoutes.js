const express = require('express');
const router = express.Router();
const { getShops, getShopById } = require('../controllers/shopController');

router.get('/', getShops);
router.get('/:id', getShopById);

module.exports = router;
