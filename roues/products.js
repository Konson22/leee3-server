const express = require('express');

const { getAllProducts, addProduct, getReserveProducts, addReserveProduct, getSingleReserve, checkoutReserve, deleteProducts, editProduct } = require('../controllers/productController');
const upload = require('../midlewares/upload');


const router = express.Router();


router.get('/', getAllProducts);
router.post('/delete', deleteProducts);
router.post('/reservation', addReserveProduct);
router.post('/reservation/code', getSingleReserve);
router.post('/reservation/checkout', checkoutReserve);
router.get('/reservation', getReserveProducts);

router.post('/edit', upload.single("image"), editProduct);
router.post('/upload', upload.single("image"), addProduct);

module.exports = router;