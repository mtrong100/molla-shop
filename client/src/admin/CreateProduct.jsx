import React, { useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { toast } from "sonner";
import { productSchema } from "../validations/productSchema";
import FieldInput from "../components/form/FieldInput";
import { Select, Option, Carousel, IconButton } from "@material-tailwind/react";
import {
  PRODUCT_BRANDS,
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_RATING,
  PRODUCT_SIZES,
} from "../utils/constants";
import { displayRating, displayTextColor } from "../utils/helper";
import FieldTexarea from "../components/form/FieldTexarea";
import JoditEditor from "jodit-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAll,
  selectedBrand,
  selectedCategory,
  selectedColor,
  selectedRating,
  selectedSize,
  setImages,
  setInfo,
} from "../redux/slices/createProductSlice";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: "",
      discount: "",
      rating: "",
      stock: "",
    },
  });

  const dispatch = useDispatch();
  const editor = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const { images, size, color, brand, category, info, rating } = useSelector(
    (state) => state.createProduct
  );

  const onSubmit = async (values) => {
    if (!(size || color || brand || category || rating)) {
      toast.info("Please select all the fields");
      return;
    }

    if (images.length === 0) {
      toast.info("Please upload 5 images");
      return;
    }

    if (images.length > 5) {
      toast.info("Maximum 5 images for 1 product");
      return;
    }

    if (!info.trim()) {
      toast.info("Product infomation is required");
      return;
    }

    try {
      const req = {
        ...values,
        images,
        size,
        color,
        brand,
        category,
        info,
        rating,
      };

      // CALL API HERE !!!
      // const res = await

      reset();
      dispatch(resetAll());
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to create new product: ", error);
    }
  };

  const handleUploadImages = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const storage = getStorage();
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, "pictures/" + file.name + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log("Failed to upload images: ", error);
          toast.error("Failed to upload images");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            uploadedImages.push(downloadURL);
            if (uploadedImages.length === files.length) {
              dispatch(setImages(uploadedImages));
            }
          });
        }
      );
    }
  };

  return (
    <div>
      <TitleSection>Create new product</TitleSection>

      <div className="my-10 w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FieldInput
            labelText="Name"
            register={register}
            name="name"
            errorMessage={errors?.name?.message}
          />

          <FieldTexarea
            labelText="Description"
            register={register}
            name="desc"
            errorMessage={errors?.desc?.message}
          />

          <FieldInput
            type="number"
            labelText="Price"
            register={register}
            name="price"
            errorMessage={errors?.price?.message}
          />

          <FieldInput
            type="number"
            labelText="Discount"
            register={register}
            name="discount"
            errorMessage={errors?.discount?.message}
          />

          <FieldInput
            type="number"
            labelText="Stock"
            register={register}
            name="stock"
            errorMessage={errors?.stock?.message}
          />

          <Select
            value={category}
            className="capitalize"
            size="lg"
            label="Select Category"
            onChange={(val) => dispatch(selectedCategory(val))}
          >
            {PRODUCT_CATEGORIES.map((item) => (
              <Option
                value={item}
                className="capitalize font-semibold"
                key={item}
              >
                {item}
              </Option>
            ))}
          </Select>

          <Select
            className="capitalize"
            size="lg"
            label="Select Size"
            value={size}
            onChange={(val) => dispatch(selectedSize(val))}
          >
            {PRODUCT_SIZES.map((item) => (
              <Option
                value={item}
                className="capitalize font-semibold"
                key={item}
              >
                {item}
              </Option>
            ))}
          </Select>

          <Select
            value={brand}
            onChange={(val) => dispatch(selectedBrand(val))}
            className="capitalize"
            size="lg"
            label="Select Brand"
          >
            {PRODUCT_BRANDS.map((item) => (
              <Option
                value={item}
                className="capitalize font-semibold"
                key={item}
              >
                {item}
              </Option>
            ))}
          </Select>

          <Select
            value={color}
            onChange={(val) => dispatch(selectedColor(val))}
            className="capitalize"
            size="lg"
            label="Select Color"
          >
            {PRODUCT_COLORS.map((item) => (
              <Option
                value={item}
                className={`${displayTextColor(item)} capitalize font-semibold`}
                key={item}
              >
                {item}
              </Option>
            ))}
          </Select>

          <Select
            value={rating}
            onChange={(val) => dispatch(selectedRating(val))}
            className="capitalize"
            size="lg"
            label="Select Rating"
          >
            {PRODUCT_RATING.map((item) => (
              <Option
                value={item}
                className="capitalize font-semibold"
                key={item}
              >
                {displayRating(item)}
              </Option>
            ))}
          </Select>

          <JoditEditor
            ref={editor}
            value={info}
            onChange={(newContent) => dispatch(setInfo(newContent))}
          />

          <div>
            <input
              type="file"
              id="image-upload"
              className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              multiple
              accept="image/*"
              onChange={handleUploadImages}
            />
            <Carousel
              className="rounded-xl mt-5"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
              prevArrow={({ handlePrev }) => (
                <IconButton
                  type="button"
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  type="button"
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}
            >
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="image 3"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </div>

          <Button
            disabled={isSubmitting}
            color="amber"
            className="w-full"
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
