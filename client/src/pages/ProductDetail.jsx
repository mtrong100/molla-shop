import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useGetBlogDetail from "../hooks/useGetProductDetail";
import { Typography, Button, Rating } from "@material-tailwind/react";
import { displayRating } from "../components/displayRating";
import BoxQuantityProduct from "../components/BoxQuantityProduct";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import parse from "html-react-parser";
import useGeRealtedProducts from "../hooks/useGeRealtedProducts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { toast } from "sonner";
import {
  increaseLimit,
  listComments,
  loadingCmt,
  setCommentVal,
  setRating,
} from "../redux/slices/commentSlice";
import {
  createCommentApi,
  deleteCommentApi,
  getCommentsFromProductApi,
} from "../api/reviewApi";
import { formatDate } from "../utils/helper";
import { getUserWishlistApi, toggleWishlistApi } from "../api/wishlistApi";
import {
  setIsInWishlist,
  setUserWishlist,
} from "../redux/slices/wishlistSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { comments, commentVal, rating, limit, isLoadingCmt } = useSelector(
    (state) => state.comment
  );
  const { userWishlist } = useSelector((state) => state.wishlist);
  const { product: p } = useGetBlogDetail(id);
  const { relatedProducts, isLoading } = useGeRealtedProducts(p?.category);
  const [selectedImage, setSelectedImage] = useState("");

  const addProductToCart = async () => {
    toast.info("Product added to cart", { position: "top-right" });
  };

  async function fetchComments() {
    try {
      dispatch(loadingCmt(true));
      const res = await getCommentsFromProductApi(id, { limit: limit });
      dispatch(listComments(res));
      dispatch(loadingCmt(false));
    } catch (error) {
      dispatch(listComments([]));
      dispatch(loadingCmt(false));
    }
  }

  const handleAddCmt = async () => {
    if (!commentVal.trim()) {
      toast.info("Please type something before send");
      return;
    }

    if (!rating) {
      toast.info("Please rate this product");
      return;
    }

    try {
      const req = {
        user: currentUser?._id,
        product: id,
        comment: commentVal.trim(),
        rate: rating,
      };

      await createCommentApi(currentUser?.token, req);
      const res = await getCommentsFromProductApi(id, { limit: limit });
      dispatch(listComments(res));

      dispatch(setCommentVal(""));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCmt = async (cmtId) => {
    try {
      await deleteCommentApi(cmtId, currentUser?.token);
      const res = await getCommentsFromProductApi(id, { limit: limit });
      dispatch(listComments(res));
      toast("Comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await toggleWishlistApi({
        userId: currentUser?._id,
        productId: p?._id,
        token: currentUser?.token,
      });
      const data = await getUserWishlistApi({
        userId: currentUser?._id,
        token: currentUser?.token,
      });
      dispatch(setUserWishlist(data?.wishlist));
      dispatch(setIsInWishlist((prevState) => !prevState));
      toast.info(res?.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    fetchComments();
  }, [dispatch, id, limit]);

  const isInWishlist = userWishlist.find((item) => item?._id === p?._id);

  return (
    <div className="my-10">
      <section className="grid grid-cols-2 gap-5">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-2">
            {p?.images?.map((item, index) => (
              <div
                onClick={() => setSelectedImage(item)}
                key={index}
                className={`${
                  selectedImage === item
                    ? "border-amber-600"
                    : "border-transparent "
                } aspect-square border-2 w-[100px] h-[100px]`}
              >
                <img
                  src={item}
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="group overflow-hidden flex items-center justify-center">
            <img
              src={selectedImage || p?.thumbnails[0]}
              alt=""
              className="object-contain group-hover:scale-110 transition-all"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-3">
          <span className="hover:underline hover:text-amber-600 capitalize transition-all cursor-pointer">
            {p?.category}
          </span>

          <Typography className="font-medium text-2xl hover:text-amber-600 transition-all">
            {p?.name || ""}
          </Typography>

          <div className="flex items-center gap-5 opacity-50">
            <div className="flex items-center gap-1 text-lg text-amber-600">
              {displayRating(p?.rating)}
            </div>
            <span className="capitalize text-gray text-opacity-60">
              {`${p?.reviews?.length || 0} Reviews`}
            </span>
          </div>

          <h2 className="text-4xl text-amber-600 font-bold">${p?.price}</h2>

          <p className="mt-2 opacity-60 font-normal line-clamp-5 text-justify">
            {p?.desc}
          </p>

          <BoxQuantityProduct />

          <div className="flex items-center gap-2">
            <Button
              onClick={addProductToCart}
              variant="outlined"
              color="amber"
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              <BsCart3 size={20} />
              Add to cart
            </Button>

            {isInWishlist ? (
              <Button
                onClick={handleWishlist}
                variant="text"
                color="amber"
                className="flex rounded-none items-center gap-3  w-full justify-center"
              >
                <FaHeart size={20} />
                Added to wishlist
              </Button>
            ) : (
              <Button
                onClick={handleWishlist}
                variant="text"
                color="amber"
                className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
              >
                <FaRegHeart size={20} />
                Add to wishlist
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="mt-5 space-y-10">
        <div className="space-y-5">
          <Typography variant="h5">Additional Information</Typography>
          <div>{parse(p?.info || "")}</div>
        </div>

        <div className="space-y-3">
          <Typography variant="h5">Write your reviews</Typography>
          <div className="flex items-center gap-2">
            <p className="text-lg">Your rating: </p>
            <Rating
              onChange={(val) => dispatch(setRating(val))}
              value={rating || 1}
            />
          </div>

          <textarea
            value={commentVal}
            required
            onChange={(e) => dispatch(setCommentVal(e.target.value))}
            className="min-h-[200px] focus:border-amber-600 border-gray-300 resize-none outline-none w-full border-2 p-4 rounded-lg text-lg"
            placeholder="Write your comments"
          ></textarea>

          <Button
            onClick={handleAddCmt}
            color="amber"
            className="ml-auto flex px-14"
            size="lg"
            type="submit"
          >
            {"Submit"}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-7">
        <Typography variant="lead">
          Total Reviews ({comments?.totalDocs})
        </Typography>

        <ul className="space-y-5">
          {isLoadingCmt && (
            <p className="text-lg font-medium opacity-60 text-center">
              Loading comments...
            </p>
          )}

          {!isLoadingCmt && comments?.docs?.length === 0 && (
            <p className="text-lg font-medium opacity-60 text-center">
              There is no comments yet
            </p>
          )}

          {!isLoadingCmt &&
            comments?.docs?.length > 0 &&
            comments?.docs?.map((item) => (
              <UserComment
                key={item?._id}
                item={item}
                onDelete={handleDeleteCmt}
              />
            ))}
        </ul>

        {comments?.docs?.length > 0 && comments?.totalDocs < 5 && (
          <Button
            onClick={() => dispatch(increaseLimit())}
            color="amber"
            className="mx-auto flex justify-center items-center"
            size="lg"
            type="submit"
          >
            {"Load more comments"}
          </Button>
        )}
      </div>

      <div className="mt-16">
        <Typography variant="lead" className="text-center font-medium text-2xl">
          You May Also Like
        </Typography>

        <div className="mt-5">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="carousel-item"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 4,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {isLoading &&
              Array(12)
                .fill(0)
                .map((item, index) => <ProductCardSkeleton key={index} />)}

            {!isLoading &&
              relatedProducts?.docs?.length > 0 &&
              relatedProducts?.docs?.map((item) => (
                <ProductCard key={item?._id} p={item} />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

function UserComment({ item, onDelete }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-[50px] h-[50px]">
        <img
          src={item?.user?.avatar || "https://source.unsplash.com/random"}
          alt={item?.user?.name}
          className="img-cover rounded-full"
        />
      </div>

      <div className="space-y-1">
        <div className="space-y-1">
          <Typography variant="h6">{item?.user?.name}</Typography>
          <Rating value={Number(item?.rate)} />
          <Typography variant="small">
            Posted: {formatDate(item?.createdAt)}
          </Typography>
        </div>

        <Typography variant="paragraph">{item?.comment}</Typography>

        <p
          onClick={() => onDelete(item?._id)}
          className=" cursor-pointer text-red-600 hover:underline font-medium"
        >
          Delete
        </p>
      </div>
    </li>
  );
}
