const express = require('express');
const router =express.Router();

const assetsController = require("../controllers/assets");
const validation = require("../middleware/assetValidation");
const {isAuthenticated} = require('../middleware/authenticate');

router.get("/", assetsController.getAll);

router.get("/", assetsController.getAll);

router.get("/:id", assetsController.getSingle);

router.post("/", isAuthenticated ,validation.saveAsset, assetsController.createAsset);

router.put("/:id", isAuthenticated ,validation.saveAsset, assetsController.updateAsset);

router.delete("/:id",isAuthenticated , assetsController.deleteAsset);

router.get("/:id/qrcode", assetsController.generateQRCode);

module.exports = router;
