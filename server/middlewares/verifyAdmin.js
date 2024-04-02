import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const verifyAdmin = (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (!tokenHeader) {
    return next(errorHandler(401, "Missing token"));
  }

  // Split the token from the "Bearer" text
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return next(errorHandler(401, "invalid token"));
    }

    const { role } = user;
    if (role === "admin") {
      next();
    } else {
      return next(errorHandler(403, "Not have permission not access"));
    }
  });
};
