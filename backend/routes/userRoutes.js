const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// After this middleware all routes are protected
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);
router.patch('/updateUser', userController.updateUser);
router.delete('/inactivateUser', userController.inactivateUser);
router.delete('/deleteUser', userController.deleteUser);

router
	.route('/')
	.get(authController.restrict('admin'), userController.getAllUsers);
router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
