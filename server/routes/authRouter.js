import express from "express";
import {
  googleLogin,
  login,
  register,
  resetPassword,
  sendOtp,
  verifyEmail,
} from "../controllers/authController.js";
import {
  googleLoginValidationRules,
  loginValidationRules,
  registerValidationRules,
  resetPasswordValidationRules,
  sendOtpValidationRules,
} from "../validations/authValidationRules.js";

const router = express.Router();

router.post("/register", registerValidationRules(), register);
router.post("/login", loginValidationRules(), login);
router.post("/google-login", googleLoginValidationRules(), googleLogin);
router.post("/reset-password", resetPasswordValidationRules(), resetPassword);
router.post("/send-otp", sendOtpValidationRules(), sendOtp);
router.get("/verify-email", verifyEmail);

export default router;
