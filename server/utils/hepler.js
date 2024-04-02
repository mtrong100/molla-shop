import jwt from "jsonwebtoken";

export const autoGeneratePassword = () => {
  const generatedPassword =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

  return generatedPassword;
};

export const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.log(error);
  }
};
