import Product from "../models/productModel.js";
import Wishlist from "../models/wishlistModel.js";

export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userWishlist = await Wishlist.find({ user: userId }).populate(
      "product"
    );

    const wishlistProducts = userWishlist.map((favorite) => favorite.product);

    return res.status(200).json(wishlistProducts);
  } catch (error) {
    console.log("Error in getUserWishlist controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
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

      return res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      const newWishlist = new Wishlist({ user: userId, product: productId });
      await newWishlist.save();

      const productItem = await Product.findById(productId);

      if (!productItem) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res
        .status(200)
        .json({ message: "New product added to your wishlist" });
    }
  } catch (error) {
    console.log("Error in toggleWishlist controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
