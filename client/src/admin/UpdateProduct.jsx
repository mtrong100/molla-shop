import React, { useEffect, useRef } from "react";
import TitleSection from "../components/TitleSection";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { productSchema } from "../validations/productSchema";
import FieldInput from "../components/form/FieldInput";
import { Select, Option } from "@material-tailwind/react";
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
import { useParams } from "react-router-dom";
import useGetBlogDetail from "../hooks/useGetProductDetail";
import UploadProductThumbnials from "../components/UploadProductThumbnials";
import UploadProductImages from "../components/UploadProductImages";
import useUpdateProduct from "../hooks/useUpdateProduct";

const UpdateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(productSchema),
  });

  const { id } = useParams();
  const { product } = useGetBlogDetail(id);
  const editor = useRef(null);
  const {
    handleUploadImages,
    handleUploadThumbnails,
    handleUpdateProduct,
    setForm,
    form,
    loading,
    loadingImages,
    loadingThumbnails,
    thumbnails,
    setThumbnails,
    images,
    setImages,
  } = useUpdateProduct();

  // RESET FIELDS
  useEffect(() => {
    if (product) {
      reset({
        name: product?.name,
        desc: product?.desc,
        price: product?.price,
        discount: product?.discount,
        stock: product?.stock,
      });
      setForm({
        category: product?.category,
        color: product?.color,
        size: product?.size,
        brand: product?.brand,
        rating: product?.rating,
        info: product?.info,
      });
      setImages(product?.images);
      setThumbnails(product?.thumbnails);
    }
  }, [product, reset, setForm, setImages, setThumbnails]);

  function renderSizeOption() {
    let sizeOptions = [];

    switch (form.category) {
      case "laptop":
        sizeOptions = LAPTOP_SIZES;
        break;
      case "smartphone":
      case "tablet":
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
      <TitleSection>Update product #{id}</TitleSection>

      <div className="my-10 w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="space-y-5"
        >
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
            <h1 className="mb-2 font-medium">Choose category</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Category"
              value={form.category}
              onChange={(val) => setForm({ ...form, category: val })}
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
            <h1 className="mb-2 font-medium">Choose size</h1>
            {form.size && (
              <Select
                className="capitalize"
                size="lg"
                label="Select Size"
                value={form.size}
                onChange={(val) => setForm({ ...form, size: val })}
              >
                {renderSizeOption()}
              </Select>
            )}
          </div>

          <div>
            <h1 className="mb-2 font-medium">Choose brand</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Brand"
              value={form.brand}
              onChange={(val) => setForm({ ...form, brand: val })}
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
            <h1 className="mb-2 font-medium">Choose color</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Color"
              value={form.color}
              onChange={(val) => setForm({ ...form, color: val })}
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
            <h1 className="mb-2 font-medium">Overall rating</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Rating"
              value={form.rating}
              onChange={(val) => setForm({ ...form, rating: val })}
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
            <h1 className="mb-2 font-medium">Additional infomation</h1>
            <JoditEditor
              ref={editor}
              value={form.info}
              onChange={(newContent) => setForm({ ...form, info: newContent })}
            />
          </div>

          <UploadProductThumbnials
            onChange={handleUploadThumbnails}
            thumbnails={thumbnails}
            setThumbnails={setThumbnails}
            uploading={loadingThumbnails}
          />

          <UploadProductImages
            onChange={handleUploadImages}
            images={images}
            setImages={setImages}
            uploading={loadingImages}
          />

          <Button
            disabled={loading}
            color="amber"
            className="w-full"
            size="lg"
            type="submit"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
