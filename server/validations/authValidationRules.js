import { body } from "express-validator";

export const registerValidationRules = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email too long"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 50 })
    .withMessage("The password must be at least 6 and maximum 50 characters"),

  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("The name must be at least 1 and maximum 50 characters"),

  body("avatar")
    .trim()
    .optional({ nullable: true })
    .isURL()
    .withMessage("Avatar must be a valid URL"),

  body("email").custom((value, { req }) => {
    if (value !== value.toLowerCase()) {
      throw new Error("Email must be in lowercase");
    }
    return true;
  }),
];

export const loginValidationRules = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email too long"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 50 })
    .withMessage("The password must be at least 6 and maximum 50 characters"),

  body("email").custom((value, { req }) => {
    if (value !== value.toLowerCase()) {
      throw new Error("Email must be in lowercase");
    }
    return true;
  }),
];

export const googleLoginValidationRules = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email too long"),

  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("The name must be at least 1 and maximum 50 characters"),

  body("avatar")
    .trim()
    .optional({ nullable: true })
    .isURL()
    .withMessage("Avatar must be a valid URL"),

  body("email").custom((value, { req }) => {
    if (value !== value.toLowerCase()) {
      throw new Error("Email must be in lowercase");
    }
    return true;
  }),
];

export const resetPasswordValidationRules = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email too long"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 50 })
    .withMessage("The password must be at least 6 and maximum 50 characters"),

  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password not match");
      }
      return true;
    }),

  body("otp")
    .trim()
    .isNumeric()
    .withMessage("OTP code must be numbers")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP code only has 6 numbers"),
];

export const sendOtpValidationRules = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email too long"),

  body("email").custom((value, { req }) => {
    if (value !== value.toLowerCase()) {
      throw new Error("Email must be in lowercase");
    }
    return true;
  }),
];
