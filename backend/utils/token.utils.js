import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

// Docs says that this can be async with a promise, and we can get the error in that promise.
export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);
