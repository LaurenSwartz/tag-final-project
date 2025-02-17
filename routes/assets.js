const express = require("express");
const router = express.Router();

const assetsController = require("../controllers/assets");

router.get("/", assetsController.getAll);

router.get("/:id", assetsController.getSingle);

router.post("/", assetsController.createAsset);

router.put("/:id", assetsController.updateAsset);

router.delete("/:id", assetsController.deleteAsset);

router.get("/owner/:assetOwner", assetsController.getAssetByOwner);

router.put("/checkout/:id", assetsController.checkOutAsset);

module.exports = router;
