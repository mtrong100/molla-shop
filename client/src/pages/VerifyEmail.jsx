import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailApi } from "../api/authApi";
import { Button } from "@material-tailwind/react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    fetchVerifyEmailApi();
  }, [token]);

  async function fetchVerifyEmailApi() {
    try {
      const res = await verifyEmailApi(token);
      setIsVerified(res?.verified);
    } catch (error) {
      console.log("Failed to fetch verification token ->", error);
      setIsVerified(false);
    }
  }

  return (
    <div className="flex items-center h-screen justify-center">
      <section className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            This email is{" "}
            <span className="text-green-600">
              {isVerified ? "verified" : "Not verified"}
            </span>
          </h1>
          {isVerified ? (
            <p className="opacity-90">
              You are all set, your account was already verified.
            </p>
          ) : (
            <p className="opacity-90">
              Failed to verify your email, Please try again
            </p>
          )}
          <Button
            size="lg"
            color="amber"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Continue to Molla
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VerifyEmail;
