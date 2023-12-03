const express = require('express');
const { getAllProducts, addProduct } = require('../controllers/productController');
const upload = require('../midlewares/upload');

const router = express.Router();


router.get('/', getAllProducts);
router.post('/', upload.single("image"), addProduct);

module.exports = router;
