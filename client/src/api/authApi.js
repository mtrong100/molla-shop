import axios from "axios";

export const registerApi = async (req) => {
  const res = await axios.post(`/api/auth/register`, req);
  return res.data;
};

export const loginApi = async (req) => {
  const res = await axios.post(`/api/auth/login`, req);
  return res.data;
};

export const googleLoginApi = async (req) => {
  const res = await axios.post(`/api/auth/google-login`, req);
  return res.data;
};

export const logOutApi = async () => {
  const res = await axios.post(`/api/auth/logout`);
  return res.data;
};

export const resetPasswordApi = async (req) => {
  const res = await axios.post(`/api/auth/reset-password`, req);
  return res.data;
};

export const sendOtpApi = async (req) => {
  const res = await axios.post(`/api/auth/send-otp`, req);
  return res.data;
};

export const verifyEmailApi = async (token) => {
  const res = await axios.get(`/api/auth/verify-email?token=${token}`);
  return res.data;
};
