const express = require("express");
const router = express.Router();
const userFunctions = require("../src/controllers/user");
const passport = require("passport");
const UserSignFunctions = require("../src/controllers/userSignMethods");
const clientExtractor = require("../src/middleware/clientExtractor");

/* GET users listing. */
router.get("/", userFunctions.getUsers);
router.get("/:id", clientExtractor, userFunctions.getUserById);
router.get("/mail/:token", UserSignFunctions.mailValidation);
// router.get("/tested", userFunctions.tested);

//POST methods
router.post("/", userFunctions.newUser);
router.post(
  "/signup",
  passport.authenticate("local_user-signup", { failureFlash: false }),
  async (req, res) => {
    res.status(200).json(req.user);
  }
);
router.post(
  "/login",
  UserSignFunctions.verifyLoginData,
  passport.authenticate("local_user-login", { failureFlash: false }),
  UserSignFunctions.userLogin
);
router.post("/google/signup", UserSignFunctions.googleSignup);
router.post("/google/login", UserSignFunctions.googleLogin);

//PUT methods
router.put("/update/:id", clientExtractor, userFunctions.updateUser);

module.exports = router;
