import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username must be at most 20 characters long.")
    .required("Username is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(20, "Password must be at most 20 characters long.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required.")
    .lowercase("Email must be in lowercase."),
});
