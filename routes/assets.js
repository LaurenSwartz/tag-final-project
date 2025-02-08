const express = require('express');
const router =express.Router();

const usersController =require('../controllers/assets');



router.get('/',assetsController.getAll);

router.get('/:id',assetsController.getSingle);

module.exports = router; 