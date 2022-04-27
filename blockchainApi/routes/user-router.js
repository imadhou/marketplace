const express = require('express');
const controller = require('../controllers/user-controller');

const router = express.Router();

router.get('/', controller.getAllUsers);
router.post('/', controller.addUser);
router.get('/:id', controller.getUserById);
router.get('/initialize', controller.initUsers);
router.get('/email/:email', controller.getUserByEmail);


module.exports = router;