const validator = require("../helpers/validate");
const saveAssignment = (req, res, next) => {
  const validationRule = {
    user_id: "required|string",
    asset_id: "required|string",
    date_of_assignment: "required|string"
    
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveAssignment,
};