import { useEffect } from "react";
import { toast } from "sonner";
import { getUserWishlist, toggleWishlist } from "../api/wishlistApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsInWishlist,
  setLoadingWishlist,
  setUserWishlist,
} from "../redux/slices/wishlistSlice";

export default function useWishlist({ userId, productId, token } = {}) {
  const dispatch = useDispatch();
  const { userWishlist, isLoadingWishlist, isInWishlist } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    async function fetchWishlist() {
      try {
        dispatch(setLoadingWishlist(true));
        const res = await getUserWishlist(userId, token);
        dispatch(setUserWishlist(res?.wishlist));
        dispatch(
          setIsInWishlist(res?.wishlist?.some((item) => item._id === productId))
        );
        dispatch(setLoadingWishlist(false));
      } catch (error) {
        console.log(error);
        dispatch(setUserWishlist([]));
        dispatch(setLoadingWishlist(false));
      }
    }
    fetchWishlist();
  }, [dispatch, productId, token, userId]);

  const handleWishlist = async () => {
    try {
      const res = await toggleWishlist(userId, productId, token);
      dispatch(setIsInWishlist((prevState) => !prevState));
      toast.info(res?.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return { userWishlist, isLoadingWishlist, isInWishlist, handleWishlist };
}
