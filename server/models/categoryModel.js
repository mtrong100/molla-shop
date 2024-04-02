import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model("Category", categorySchema);
export default Category;
