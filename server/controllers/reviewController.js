import Review from "../models/reviewModel.js";

const COMMENT_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "desc",
};

export const getReviewsFromProduct = async (req, res) => {
  try {
    const {
      page = COMMENT_QUERY.PAGE,
      limit = COMMENT_QUERY.LIMIT,
      order = COMMENT_QUERY.ORDER,
    } = req.query;

    const { productId } = req.params;

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

    const cmts = await Review.paginate(filter, options);

    if (!cmts.docs || cmts.docs.length === 0) {
      return res.status(404).json({ error: "Comments not found" });
    }

    return res.status(200).json(cmts);
  } catch (error) {
    console.log("Error in getReviewsFromProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createReview = async (req, res) => {
  try {
    const newCmt = new Review(req.body);
    await newCmt.save();

    return res.status(201).json(newCmt);
  } catch (error) {
    console.log("Error in createReview controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCmt = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCmt) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json(updatedCmt);
  } catch (error) {
    console.log("Error in updateReview controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const cmt = await Review.findByIdAndDelete(id);

    if (!cmt) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment has been deleted" });
  } catch (error) {
    console.log("Error in deleteReview controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
