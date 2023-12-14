const express = require('express');
const { getAllOrders, addOrder, getUserOrders, deleteOrder, getOrderDetail } = require('../controllers/ordersController');

const router = express.Router();


router.get('/', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/single', getOrderDetail);
router.post('/', addOrder);
router.post('/user-orders', getUserOrders);


module.exports = router;
