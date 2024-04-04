import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  desc: yup.string().required("Product description is required"),
  additionalInfo: yup.string().required("Additional information is required"),
  images: yup
    .array()
    .of(yup.string().url("Image URL must be valid"))
    .required("At least one image is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: yup.number().min(0, "Discount must be non-negative"),
  rating: yup.string().required("Rating is required"),
  size: yup.string(),
  color: yup.string(),
  brand: yup.string(),
  stock: yup
    .number()
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock must be non-negative"),
  reviews: yup.array().of(
    yup.object().shape({
      user: yup.string().required("User ID is required"),
      comment: yup.string().required("Review comment is required"),
      rate: yup.string().required("Review rating is required"),
      createdAt: yup.date().required("Review creation date is required"),
      updatedAt: yup.date().required("Review update date is required"),
    })
  ),
});
