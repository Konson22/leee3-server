const express = require('express');
const { getAllOrders, addOrder, getUserOrders, deleteOrder } = require('../controllers/ordersController');
const { verifyToken } = require('../midlewares/jwt');

const router = express.Router();


router.get('/', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/', verifyToken, addOrder);
router.get('/single', verifyToken, getUserOrders);


module.exports = router;
