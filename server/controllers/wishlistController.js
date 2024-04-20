import Product from "../models/productModel.js";
import Wishlist from "../models/wishlistModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getUserWishlist = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userWishlist = await Wishlist.find({ user: userId }).populate(
      "product"
    );

    const wishlistProducts = userWishlist.map((favorite) => favorite.product);

    res.status(200).json({ success: true, wishlist: wishlistProducts });
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const existingWishlist = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existingWishlist) {
      await Wishlist.deleteOne({
        _id: existingWishlist._id,
      });

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
      });
    } else {
      const newWishlist = new Wishlist({ user: userId, product: productId });
      await newWishlist.save();

      const productItem = await Product.findById(productId);

      if (!productItem) {
        return next(errorHandler(404, "Product not found"));
      }

      return res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        result: productItem,
      });
    }
  } catch (error) {
    next(error);
  }
};
