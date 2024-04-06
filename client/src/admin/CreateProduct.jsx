import React, { useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { toast } from "sonner";
import { productSchema } from "../validations/productSchema";
import FieldInput from "../components/form/FieldInput";
import { Select, Option, Carousel, IconButton } from "@material-tailwind/react";
import {
  LAPTOP_SIZES,
  PHONE_SIZES,
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
  removeImage,
  removeThumbnail,
  resetAll,
  selectedBrand,
  selectedCategory,
  selectedColor,
  selectedRating,
  selectedSize,
  setImages,
  setInfo,
  setThumbnails,
} from "../redux/slices/createProductSlice";
import { createProductApi } from "../api/productApi";
import { IoMdClose } from "react-icons/io";

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
  const { images, color, brand, category, info, rating, thumbnails, size } =
    useSelector((state) => state.createProduct);

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

    if (thumbnails.length === 0) {
      toast.info("Please upload 2 thumbnail images");
      return;
    }

    if (thumbnails.length > 2) {
      toast.info("Thumbnail only have 2 images");
      return;
    }

    if (!info.trim()) {
      toast.info("Product infomation is required");
      return;
    }

    try {
      const req = {
        ...values,
        price: Number(values.price),
        images,
        thumbnails,
        size,
        color,
        brand,
        category,
        info,
        rating: Number(rating),
      };

      const res = await createProductApi(currentUser?.token, req);
      toast.success(res?.message);

      reset();
      dispatch(resetAll());
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to create new product: ", error);
    }
  };

  function renderSizeOption() {
    let sizeOptions = [];

    switch (category) {
      case "laptop":
        sizeOptions = LAPTOP_SIZES;
        break;
      case "smartphone":
        sizeOptions = PHONE_SIZES;
        break;
      default:
        sizeOptions = PRODUCT_SIZES;
    }

    return sizeOptions.map((item) => (
      <Option value={item} className="capitalize font-semibold" key={item}>
        {item}
      </Option>
    ));
  }

  return (
    <div>
      <TitleSection>Create new product</TitleSection>

      <div className="my-10 w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInput
            labelTitle="Product name"
            labelText="Name"
            register={register}
            name="name"
            errorMessage={errors?.name?.message}
          />

          <FieldTexarea
            labelTitle="Product description"
            labelText="Description"
            register={register}
            name="desc"
            errorMessage={errors?.desc?.message}
          />

          <FieldInput
            labelTitle="Product price"
            type="text"
            labelText="Price"
            register={register}
            name="price"
            errorMessage={errors?.price?.message}
          />

          <FieldInput
            labelTitle="Product discount"
            type="number"
            labelText="Discount"
            register={register}
            name="discount"
            errorMessage={errors?.discount?.message}
          />

          <FieldInput
            labelTitle="Product stock"
            type="number"
            labelText="Stock"
            register={register}
            name="stock"
            errorMessage={errors?.stock?.message}
          />

          <div>
            <h1 className="mb-2 font-bold text-lg">Choose category</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Category"
              onChange={(val) => dispatch(selectedCategory(val))}
            >
              {PRODUCT_CATEGORIES.map((item) => (
                <Option
                  key={item}
                  value={item}
                  className="capitalize font-semibold"
                >
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-bold text-lg">Choose size</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Size"
              onChange={(val) => dispatch(selectedSize(val))}
            >
              {renderSizeOption()}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-bold text-lg">Choose brand</h1>
            <Select
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
          </div>

          <div>
            <h1 className="mb-2 font-bold text-lg">Choose color</h1>
            <Select
              onChange={(val) => dispatch(selectedColor(val))}
              className="capitalize"
              size="lg"
              label="Select Color"
            >
              {PRODUCT_COLORS.map((item) => (
                <Option
                  value={item}
                  className={`${displayTextColor(
                    item
                  )} capitalize font-semibold`}
                  key={item}
                >
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-bold text-lg">Overall rating</h1>
            <Select
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
          </div>

          <div>
            <h1 className="mb-2 font-bold text-lg">Additional infomation</h1>
            <JoditEditor
              ref={editor}
              value={info}
              onChange={(newContent) => dispatch(setInfo(newContent))}
            />
          </div>

          <UploadProductThumbnials />

          <UploadProductImages />

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

function UploadProductImages() {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.createProduct);

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
      <h1 className="font-bold text-lg">Product images (max 5 images)</h1>
      <input
        type="file"
        id="image-upload"
        className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        multiple
        accept="image/*"
        onChange={handleUploadImages}
      />
      <Carousel
        className="rounded-xl mt-5 border bg-gray-100"
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
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-amber-50 hover:bg-amber-100 text-amber-600"
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
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-amber-50 hover:bg-amber-100 text-amber-600"
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
        {images?.map((item, index) => (
          <div key={index} className="w-full h-[500px]">
            <img
              src={item}
              alt={index}
              className="w-full h-full object-contain"
            />

            <span
              onClick={() => dispatch(removeImage(item))}
              className="flex absolute top-3 right-3 items-center justify-center w-[40px] h-[40px] bg-red-500 text-white rounded-full cursor-pointer"
            >
              <IoMdClose size={22} />
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

function UploadProductThumbnials() {
  const dispatch = useDispatch();
  const { thumbnails } = useSelector((state) => state.createProduct);
  console.log(thumbnails);

  const handleUploadThumbnail = async (event) => {
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
              dispatch(setThumbnails(uploadedImages));
            }
          });
        }
      );
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg">Thumbnail (max 2 images)</h1>
      <input
        type="file"
        id="thumbnail-upload"
        className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        multiple
        accept="image/*"
        onChange={handleUploadThumbnail}
      />
      <Carousel
        className="rounded-xl mt-5 border bg-gray-100"
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
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-amber-50 hover:bg-amber-100 text-amber-600"
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
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-amber-50 hover:bg-amber-100 text-amber-600"
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
        {thumbnails?.map((item, index) => (
          <div key={index} className="w-full h-[500px]">
            <img
              src={item}
              alt={index}
              className="w-full h-full object-contain"
            />

            <span
              onClick={() => dispatch(removeThumbnail(item))}
              className="flex absolute top-3 right-3 items-center justify-center w-[40px] h-[40px] bg-red-500 text-white rounded-full cursor-pointer"
            >
              <IoMdClose size={22} />
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
