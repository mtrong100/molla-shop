import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { autoGeneratePassword, generateToken } from "../utils/hepler.js";
import {
  sendConfirmationEmail,
  sendOtpResetPassword,
} from "../services/emailService.js";
import { validationResult } from "express-validator";
import { AUTH_PROVIDER } from "../utils/constants.js";
import crypto from "crypto";

export const register = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, avatar } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(
        errorHandler(400, "User is already exist, try login instead")
      );
    }

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Tạo email token
    const token = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      name,
      email,
      avatar,
      provider: AUTH_PROVIDER.emailAndPassword,
      password: hash,
      verificationToken: token,
    });

    await newUser.save();

    // Send comfirmation email
    sendConfirmationEmail(email, token);

    return res
      .status(201)
      .json({ message: "Account created, please verify your email to login" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Account not found"));
    }

    if (!user.verified) {
      return next(errorHandler(400, "Email was not verified"));
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong password"));
    }

    const token = await generateToken({ id: user._id, role: user.role });

    const userResponse = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      provider: user.provider,
      address: user.address,
      phone: user.phone,
      role: user.role,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      favorites: user.favorites,
    };

    return res.status(200).json({
      message: "Login successfully",
      results: userResponse,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, avatar } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = autoGeneratePassword();

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

      const token = await generateToken({
        id: newUser._id,
        role: newUser.role,
      });

      const userResponse = {
        _id: newUser._id,
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
        provider: newUser.provider,
        address: newUser.address,
        phone: newUser.phone,
        role: newUser.role,
        verified: newUser.verified,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        favorites: newUser.favorites,
      };

      return res.status(201).json({
        message: "Account created",
        results: userResponse,
        token,
      });
    }

    const token = await generateToken({ id: user._id, role: user.role });

    const userResponse = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      provider: user.provider,
      address: user.address,
      phone: user.phone,
      role: user.role,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      favorites: user.favorites,
    };

    return res.status(200).json({
      message: "Login successfully",
      results: userResponse,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, confirmPassword, otp } = req.body;

    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return next(errorHandler(404, "Account not found"));
    }

    // Check if OTP expired
    if (user.resetPasswordExpires < Date.now()) {
      return next(errorHandler(400, "OTP expired"));
    }

    // Check if OTP not match
    if (user.resetPasswordOtp !== otp) {
      return next(errorHandler(400, "Invalid OTP"));
    }

    // Validate and update the password
    if (password !== confirmPassword) {
      return next(errorHandler(400, "Confirm password not match"));
    }

    // Update password and reset OTP & expire time
    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();

    return res.status(200).json({ message: "Reset password success" });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return next(errorHandler(404, "Account not found"));
    }

    // Generate OTP code and expire time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOtpResetPassword(email, otp);

    return res.status(200).json({ message: "OTP has been sent to your email" });
  } catch (error) {
    next(error);
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
    next(error);
  }
};
