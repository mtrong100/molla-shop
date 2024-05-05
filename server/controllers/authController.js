import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  autoGeneratePassword,
  generateTokenAndSetCookie,
} from "../utils/helper.js";
import {
  sendConfirmationEmail,
  sendOtpResetPassword,
} from "../services/emailService.js";
import { AUTH_PROVIDER } from "../utils/constants.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { email, password, name, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Account is already existed" });
    }

    // HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create email token for verification
    const token = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      name,
      email,
      provider: AUTH_PROVIDER.emailAndPassword,
      password: hash,
      verificationToken: token,
      // verified: true,
      // role: "admin",
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    sendConfirmationEmail(email, token);

    return res.status(201).json({
      message: "Account created, please verify your email to login",
    });
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Account not found" });
    }

    if (!user.verified) {
      return res.status(400).json({ error: "Account not verified" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Wrong password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      verified: user.verified,
      provider: user.provider,
      phone: newUser.phone,
      address: newUser.address,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = autoGeneratePassword();

      // HASH PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(generatedPassword, salt);

      const newUser = new User({
        name,
        email,
        avatar,
        provider: AUTH_PROVIDER.google,
        password: hash,
        verified: true,
      });

      await newUser.save();

      generateTokenAndSetCookie(newUser._id, res);

      return res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
        role: newUser.role,
        verified: newUser.verified,
        provider: newUser.provider,
        phone: newUser.phone,
        address: newUser.address,
      });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      verified: user.verified,
      provider: user.provider,
      phone: user.phone,
      address: user.address,
    });
  } catch (error) {
    console.log("Error in google login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Check if OTP expired
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Check if OTP not match
    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Validate and update the password
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords dont't match" });
    }

    // Update password and reset OTP & expire time
    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();

    return res.status(200).json({ message: "Reset password successfully" });
  } catch (error) {
    console.log("Error in reset password controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Generate OTP code and expire time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOtpResetPassword(email, otp);

    return res.status(200).json({ message: "OTP has been sent to your email" });
  } catch (error) {
    console.log("Error in send OTP controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: "Invalid verification token" });
    }

    user.verified = true;

    const newUser = await user.save();

    const { verified } = newUser._doc;

    return res
      .status(200)
      .json({ message: "Verify email successfully", verified });
  } catch (error) {
    console.log("Error in send verify email controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
