const { Router } = require("express");
const router = Router();
const passport = require("passport");
const clientSignFunctions = require("../src/controllers/clientSignMethods");
//POST methods

//Client sign methods...
router.post(
  "/client/signup",
  passport.authenticate("local_client-signup", { failureFlash: true }),
  async (req, res, next) => {
    res.status(200).json(req.user);
  }
);
router.post(
  "/client/login",
  clientSignFunctions.verifyLoginData,
  passport.authenticate("local_client-login", { failureFlash: false }),
  clientSignFunctions.clientLogin
);

router.post("/client/signup/google", clientSignFunctions.googleSignup);
router.post("/client/login/google", clientSignFunctions.googleLogin);

//GET methods
router.get("/client/:token", clientSignFunctions.mailValidation);
module.exports = router;
