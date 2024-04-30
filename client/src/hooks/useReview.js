import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createReviewApi,
  deleteReviewApi,
  getReviewsFromProductApi,
} from "../api/reviewApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useReview() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [val, setVal] = useState("");
  const [rating, setRating] = useState(5);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);

      try {
        const res = await getReviewsFromProductApi({ limit, productId });
        setReviews(res);
      } catch (error) {
        console.log("Failed to fetch reviews: ", error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [dispatch, limit, productId]);

  const handleWriteReview = async (productId) => {
    if (!val.trim()) {
      toast.info("Please write your review");
      return;
    }

    if (!rating) {
      toast.info("Please rate this product");
      return;
    }

    setIsAdding(true);

    try {
      const req = {
        user: currentUser?._id,
        product: productId,
        comment: val,
        rate: rating,
      };

      await createReviewApi(req);
      const res = await getReviewsFromProductApi({ limit, productId });
      setReviews(res);
      setVal("");
      toast.success("New review added");
    } catch (error) {
      console.log("Failed to handleWriteReview: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setIsDeleting(true);

    try {
      await deleteReviewApi(reviewId);
      const res = await getReviewsFromProductApi({ limit, productId });
      setReviews(res);
      toast.success("Review has been deleted");
    } catch (error) {
      console.log("Failed to handleDeleteReview: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLoadMoreReview = () => {
    setLimit((prev) => prev + 5);
  };

  return {
    handleDeleteReview,
    handleWriteReview,
    handleLoadMoreReview,
    limit,
    setLimit,
    setVal,
    val,
    setRating,
    rating,
    reviews,
    isLoading,
    isAdding,
    isDeleting,
  };
}
