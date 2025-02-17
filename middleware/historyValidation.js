const validator = require('../helpers/validate');
const saveHistory = (req, res, next) => {
    const validationRule = {
      asset_id: 'required|string',
      last_used: 'required|string'
    
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
    saveHistory
  };