import * as yup from "yup";

export const accountSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username must be at most 20 characters long.")
    .required("Username is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required.")
    .lowercase("Email must be in lowercase."),
  address: yup
    .string()
    .max(255, "Address must be at most 255 characters long."),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(15, "Phone number must be at most 15 digits long.")
    .required("Phone number is required."),
});
