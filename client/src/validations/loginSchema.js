import * as yup from "yup";

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(20, "Password must be at most 20 characters long.")
    .required("Password is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required.")
    .lowercase("Email must be in lowercase."),
});
