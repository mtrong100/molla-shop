import React from "react";
import TitleSection from "../components/TitleSection";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  return (
    <div>
      <TitleSection>Create new product</TitleSection>

      <div className="my-10 w-full max-w-2xl mx-auto">
        <form className="space-y-3">
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
