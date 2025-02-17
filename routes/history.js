const router = require("express").Router();

const historyController = require("../controllers/history");
const validation = require('../middleware/historyValidation');

router.get("/", historyController.getAll);

router.get("/:id", historyController.getSingle);

router.post('/',validation.saveHistory, historyController.createHistory);

router.put('/:id',validation.saveHistory, historyController.updateHistory);

router.delete('/:id',validation.saveHistory, historyController.deleteHistory);

module.exports = router;