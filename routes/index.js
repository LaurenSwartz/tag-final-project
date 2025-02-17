const router = require("express").Router();

router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello World");
});
router.use("/users", require("./users"));
router.use("/assets", require("./assets"));
router.use("/history", require("./history"));
router.use("/api-docs", require("./swagger"));

module.exports = router;
