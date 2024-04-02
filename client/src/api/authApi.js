import axios from "axios";

export const registerApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/register`,
    req
  );
  return res.data;
};

export const loginApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/login`,
    req
  );
  return res.data;
};

export const resetPasswordApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/reset-password`,
    req
  );

  return res.data;
};

export const sendOtpApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/send-otp`,
    req
  );

  return res.data;
};

export const verifyEmailApi = async (token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/auth/verify-email?token=${token}`
  );

  return res.data;
};

export const googleLogin = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/google-login`
  );

  return res.data;
};
