const validator = require('../helpers/validate');
const saveUser = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      gender:'required|string',
      email: 'required|email',
      department: 'required|string',
      postion: 'string'
    
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
    saveUser
  };