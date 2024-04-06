import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must be at most 50 characters"),
  desc: yup
    .string()
    .required("Product description is required")
    .min(10, "Product description must be at least 10 characters")
    .max(500, "Product description must be at most 500 characters"),
  price: yup
    .number("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: yup
    .number("Discount must be a number")
    .min(0, "Discount must be non-negative")
    .max(100, "Discount must be less than or equal to 100"),
  stock: yup
    .number("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock must be non-negative"),
});
