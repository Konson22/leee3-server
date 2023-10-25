const express = require('express');

const { getAllProducts, addProduct, getReserveProducts, addReserveProduct } = require('../controllers/productController');
const upload = require('../midlewares/upload');


const router = express.Router();


router.get('/', getAllProducts);
router.post('/reservation', addReserveProduct);
router.get('/reservation', getReserveProducts);

router.post('/upload', upload.single("image"), addProduct);

module.exports = router;