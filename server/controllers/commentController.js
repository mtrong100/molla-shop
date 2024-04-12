import Review from "../models/reviewModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getCommentsFromProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, order = "desc" } = req.query;

    const filter = { product: productId };

    const options = {
      page,
      limit,
      sort: { createdAt: order === "asc" ? 1 : -1 },
      populate: {
        path: "user",
        select: "name email _id avatar",
      },
    };

    const data = await Review.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "Comments not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* CRUD BLOG */
export const createComment = async (req, res, next) => {
  try {
    const newCmt = new Review(req.body);
    await newCmt.save();

    return res
      .status(201)
      .json({ message: "Create new cmt sucessfully", results: newCmt });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Review.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "cmt updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Review.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "Cmt has been deleted" });
  } catch (error) {
    next(error);
  }
};
