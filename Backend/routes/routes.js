const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.get('/',userController.getAll);

router.post('/add',userController.addUser);

router.post('/edit',userController.editUser);

router.get('/delete/:id',userController.deleteUser);

module.exports = router;
