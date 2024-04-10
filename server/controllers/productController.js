import { validationResult } from "express-validator";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      order = "desc",
      query,
      category,
      size,
      color,
      brand,
      minPrice = 0,
      maxPrice = 1000,
    } = req.query;

    const filter = {};

    if (query) filter.name = new RegExp(query, "i");
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (brand) filter.brand = brand;
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
    };

    const products = await Product.paginate(filter, options);

    if (!products.docs || products.docs.length === 0) {
      next(errorHandler(404, "Products not found"));
    }

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProduct = new Product(req.body);

    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Create new product success", results: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return next(errorHandler(404, "Product not found"));
    }

    return res
      .status(200)
      .json({ message: "Update product success", results: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    return res.status(200).json({ message: "Delete product success" });
  } catch (error) {
    next(error);
  }
};

export const favoriteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(errorHandler(404, "User not found"));
    }

    if (currentUser.favorites.includes(id)) {
      currentUser.favorites = currentUser.favorites.filter(
        (item) => item !== id
      );

      await currentUser.save();
      return res.json({ message: "Remove product from wishlist success" });
    } else {
      currentUser.favorites.push(id);
      await currentUser.save();
      return res.json({ message: "Product added to your wishlist" });
    }
  } catch (error) {
    next(error);
  }
};
