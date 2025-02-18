const express = require('express');
const router =express.Router();

const historyController = require("../controllers/history");
const validation = require('../middleware/historyValidation');
const {isAuthenticated} = require('../middleware/authenticate');

router.get("/", historyController.getAll);

router.get("/:id", historyController.getSingle);

router.post('/',isAuthenticated ,validation.saveHistory, historyController.createHistory);

router.put('/:id',isAuthenticated ,validation.saveHistory, historyController.updateHistory);

router.delete('/:id',isAuthenticated , historyController.deleteHistory);

module.exports = router;