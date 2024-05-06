import React, { useRef } from "react";
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
import useCreateProduct from "../hooks/useCreateProduct";
import UploadProductThumbnials from "../components/UploadProductThumbnials";
import UploadProductImages from "../components/UploadProductImages";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: "",
      discount: 0,
      stock: 1000,
    },
  });

  const editor = useRef(null);
  const {
    handleUploadImages,
    handleUploadThumbnails,
    handleCreateProduct,
    handleDeleteThumbnails,
    handleDeleteImage,
    setForm,
    form,
    loading,
    loadingImages,
    loadingThumbnails,
    thumbnails,
    setThumbnails,
    images,
    setImages,
  } = useCreateProduct();

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
      <TitleSection>Create new product</TitleSection>

      <div className="my-10 w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
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
            <h1 className="mb-2 font-semibold">Choose category</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Category"
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
            <h1 className="mb-2 font-semibold">Choose size</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Select Size"
              onChange={(val) => setForm({ ...form, size: val })}
            >
              {renderSizeOption()}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Choose brand</h1>
            <Select
              onChange={(val) => setForm({ ...form, brand: val })}
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
            <h1 className="mb-2 font-semibold">Choose color</h1>
            <Select
              onChange={(val) => setForm({ ...form, color: val })}
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
            <h1 className="mb-2 font-semibold">Overall rating</h1>
            <Select
              onChange={(val) => setForm({ ...form, rating: val })}
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
            <h1 className="mb-2 font-semibold">Additional infomation</h1>
            <JoditEditor
              ref={editor}
              value={form.info}
              onChange={(newContent) => setForm({ ...form, info: newContent })}
            />
          </div>

          <UploadProductThumbnials
            onChange={handleUploadThumbnails}
            thumbnails={thumbnails}
            uploading={loadingThumbnails}
            onDelete={handleDeleteThumbnails}
          />

          <UploadProductImages
            onChange={handleUploadImages}
            images={images}
            uploading={loadingImages}
            onDelete={handleDeleteImage}
          />

          <Button
            disabled={loading}
            color="amber"
            className="w-full"
            size="lg"
            type="submit"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
