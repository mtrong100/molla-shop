import { body } from "express-validator";

export const createProductValidationRule = () => [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name must be a non-empty string"),
  body("desc")
    .isString()
    .notEmpty()
    .withMessage("Description must be a non-empty string"),
  body("info")
    .isString()
    .notEmpty()
    .withMessage("Info must be a non-empty string"),
  body("images")
    .isArray({ min: 1, max: 5 })
    .withMessage("At least one image is required"),
  body("thumbnails")
    .isArray({ min: 2, max: 2 })
    .withMessage("Two images are required"),
  body("category")
    .isString()
    .notEmpty()
    .withMessage("Category must be a non-empty string"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("discount").isNumeric().withMessage("Discount must be a number"),
  body("rating").isNumeric().withMessage("Rating must be a number"),
  body("size")
    .isString()
    .notEmpty()
    .withMessage("Size must be a non-empty string"),
  body("color")
    .isString()
    .notEmpty()
    .withMessage("Color must be a non-empty string"),
  body("brand")
    .isString()
    .notEmpty()
    .withMessage("Brand must be a non-empty string"),
  body("stock").isNumeric().withMessage("Stock must be a number"),
];
