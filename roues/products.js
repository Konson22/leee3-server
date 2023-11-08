const express = require('express');

const { getAllProducts, addProduct, getReserveProducts, addReserveProduct, getSingleReserve, checkoutReserve } = require('../controllers/productController');
const upload = require('../midlewares/upload');


const router = express.Router();


router.get('/', getAllProducts);
router.post('/reservation', addReserveProduct);
router.post('/reservation/code', getSingleReserve);
router.post('/reservation/checkout', checkoutReserve);
router.get('/reservation', getReserveProducts);

router.post('/upload', upload.single("image"), addProduct);

module.exports = router;