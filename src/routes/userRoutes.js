const express  = require("express");
const userController = require("../controllers/user");
const { verifyAuthToken } = require("jsonwebtoken");
const router = express.Router();

router.post('/register', userController.addUser);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id/delete', userController.deleteUser);

module.exports = router;