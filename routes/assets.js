const express = require('express');
const router =express.Router();

const assetsController =require('../controllers/assets');
const validation = require('../middleware/assetValidation');


router.get('/', assetsController.getAll);

router.get('/:id', assetsController.getSingle);

router.post('/', validation.saveAsset, assetsController.createAsset);

router.put('/:id', validation.saveAsset, assetsController.updateAsset);

router.delete('/:id', validation.saveAsset ,assetsController.deleteAsset);

router.get('/owner/:assetOwner',assetsController.getAssetByOwner);

router.put('/checkout/:id',assetsController.checkOutAsset);

module.exports = router; 