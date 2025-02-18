const express = require('express');
const router =express.Router();

const assignmentController = require("../controllers/assignments");
const validation = require("../middleware/assignmentValidation");
const {isAuthenticated} = require('../middleware/authenticate');

router.get("/", assignmentController.getAll);

router.get("/:id", assignmentController.getSingle);

router.post("/",isAuthenticated ,validation.saveAssignment,assignmentController.createAssignment);

router.put("/:id",isAuthenticated ,validation.saveAssignment,assignmentController.updateAssignment);

router.delete("/:id",isAuthenticated ,assignmentController.deleteAssignment);

module.exports = router;
