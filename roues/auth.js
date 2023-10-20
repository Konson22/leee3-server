const express = require('express');
const router = express.Router();

const { 
    getAllUsersController, 
    registerUser, 
    authUser,
    loginUser,
} = require('../controllers/authController');
const { verifyToken } = require('../midlewares/jwt');

router.post('/', verifyToken, authUser);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/users', getAllUsersController);

module.exports = router;