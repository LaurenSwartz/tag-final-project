const router = require("express").Router();

const historyController = require("../controllers/history");

router.get("/", historyController.getAll);

router.get("/:id", historyController.getSingle);

router.post('/', historyController.createHistory);

router.put('/:id', historyController.updateHistory);

router.delete('/:id', historyController.deleteHistory);

module.exports = router;