const router = require("express").Router();

const assignmentController = require("../controllers/assignments");
const validation = require("../middleware/historyValidation");

router.get("/", assignmentController.getAll);

router.get("/:id", assignmentController.getSingle);

router.post("/", assignmentController.createAssignment);

router.put("/:id", assignmentController.updateAssignment);

router.delete("/:id", assignmentController.deleteAssignment);

module.exports = router;
