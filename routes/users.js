const express = require('express');
const router =express.Router();

const usersController = require("../controllers/user");
const validation = require("../middleware/userValidation");
const {isAuthenticated} = require('../middleware/authenticate');

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post("/",isAuthenticated ,validation.saveUser, usersController.createUser);

router.put("/:id",isAuthenticated ,validation.saveUser, usersController.updateUser);

router.delete("/:id",isAuthenticated , usersController.deleteUser);

module.exports = router;
