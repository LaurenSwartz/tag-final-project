const router = require("express").Router();

const assignmentController = require("../controllers/assignments");
const validation = require("../middleware/assignmentValidation");

router.get("/", assignmentController.getAll);

router.get("/:id", assignmentController.getSingle);

router.post("/", validation.saveAssignment,assignmentController.createAssignment);

router.put("/:id", validation.saveAssignment,assignmentController.updateAssignment);

router.delete("/:id",assignmentController.deleteAssignment);

module.exports = router;
