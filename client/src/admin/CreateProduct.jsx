import React from "react";
import TitleSection from "../components/TitleSection";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { toast } from "sonner";
import { productSchema } from "../validations/productSchema";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(productSchema),
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    try {
      const req = {
        ...values,
      };

      /// call API
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to create new product: ", error);
    }
  };

  return (
    <div>
      <TitleSection>Create new product</TitleSection>

      <div className="my-10 w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
