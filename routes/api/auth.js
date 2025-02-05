const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  verifyController,
  resendEmailController,
} = require("../../controllers/Auth/AuthController");
const { updateAvatar } = require("../../controllers/Auth/updateAvatar");

const { authMiddleware } = require("../../middlewares/authMiddleware");
const uploadMiddlewar = require("../../middlewares/uploadMiddlewar");

router.post("/signup", registrationController);
router.get("/verify/:verificationToken", verifyController);
router.post("/verify", resendEmailController);
router.post("/login", loginController);
router.get("/logout", authMiddleware, logoutController);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddlewar.single("avatar"),
  updateAvatar
);

module.exports = router;
