const express = require('express');
const { getAllOrders, addOrder, getUserOrders, deleteOrder } = require('../controllers/ordersController');

const router = express.Router();


router.get('/', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/', addOrder);
router.post('/single', getUserOrders);


module.exports = router;
