const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/userValidator');
const isUserAuthorized = require('../middlewares/isUserAuthorized');


// Login
router.post('/login', userController.login);

// Get all Users
router.get('/', verifyToken, userController.getAllUsers);

// Create a User
router.post('/', validateUser, userController.registerUser);

// Get One User
router.get('/:id', userController.getOneUser);

// Edit a User
router.put('/:id', validateUser, isUserAuthorized, userController.editUser);

// Delete a User
router.delete('/:id', isUserAuthorized, userController.deleteUser);


module.exports = router;