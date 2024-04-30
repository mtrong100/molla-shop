import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/form/FieldInput";
import { Button, Input } from "@material-tailwind/react";
import { resetPasswordApi, sendOtpApi } from "../api/authApi";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../validations/resetPasswordSchema";

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
    resolver: yupResolver(resetPasswordSchema),
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
      await sendOtpApi({ email });
      toast.success("OTP has been sent to your email");
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong with handleSendOtp function: ", error);
    }
  };

  const handleResetPassword = async (values) => {
    try {
      const req = { ...values };
      await resetPasswordApi(req);
      toast.success("Reset password successfully");
      reset();
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong with handleSendOtp function: ", error);
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

      <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-5">
        <h1 className="font-semibold text-3xl">Reset your password</h1>

        <FieldInput
          type="password"
          labelText="Password"
          register={register}
          name="password"
          errorMessage={errors?.password?.message}
        />

        <FieldInput
          type="password"
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
