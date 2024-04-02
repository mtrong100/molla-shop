import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import FieldInput from "../components/form/FieldInput";
import { Button, Input } from "@material-tailwind/react";
import { resetPasswordApi, sendOtpApi } from "../api/authApi";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .required("OTP is required")
    .max(6, "OTP code only has 6 numbers"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  const handleSendOtp = async () => {
    try {
      await trigger("email");
      const email = getValues("email");
      if (!email) return;

      const res = await sendOtpApi({ email });
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to reset password: ", error);
    }
  };

  const onSubmit = async (values) => {
    try {
      const req = {
        ...values,
      };

      const res = await resetPasswordApi(req);
      toast.success(res?.message);

      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to reset password: ", error);
    }
  };

  return (
    <div className="py-10 grid grid-cols-2 gap-20 items-center">
      <div className="aspect-square">
        <img
          src="https://source.unsplash.com/random"
          alt="banner"
          className="img-cover rounded-lg"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h1 className="font-semibold text-3xl">Reset your password</h1>

        <FieldInput
          labelText="Password"
          register={register}
          name="password"
          errorMessage={errors?.password?.message}
        />

        <FieldInput
          labelText="Confirm Password"
          register={register}
          name="confirmPassword"
          errorMessage={errors?.confirmPassword?.message}
        />

        <div>
          <div className="flex items-center justify-between gap-1">
            <Input size="lg" {...register("email")} label="Email" />
            <Button size="lg" onClick={handleSendOtp} variant="filled">
              {"Send"}
            </Button>
          </div>
          {errors && (
            <p className="mt-1 text-red-500 font-medium text-sm">
              {errors.email?.message}
            </p>
          )}
        </div>

        <FieldInput
          labelText="OTP code"
          register={register}
          name="otp"
          errorMessage={errors?.otp?.message}
        />

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
  );
};

export default ForgotPassword;
