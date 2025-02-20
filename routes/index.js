const router = require("express").Router();
const passport = require("passport");

//Hello World on route with logged in user

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Hello " + req.user.username);
  } else {
    res.send("Logged out");
  }
});

router.use("/users", require("./users"));
router.use("/assets", require("./assets"));
router.use("/history", require("./history"));
router.use("/assignments", require("./assignments"));
router.use("/api-docs", require("./swagger"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
