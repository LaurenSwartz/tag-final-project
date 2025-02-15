const validator = require('../helpers/validate');
const saveAsset = (req, res, next) => {
    const validationRule = {
      assetName: 'required|string',
      assetType: 'required|string',
      assetValue:'required|string',
      assetOwner: 'required|string',
      assetLocation: 'required|string'
    
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  module.exports = {
    saveAsset
  };