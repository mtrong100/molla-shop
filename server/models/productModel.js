import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    additionalInfo: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    view: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);
export default Product;
