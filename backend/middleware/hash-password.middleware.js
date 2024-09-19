import { hashPassword } from "../utils/hash.utils.js";

export const hashPasswordMiddleware = async (req, res, next) => {
  req.body.password = await hashPassword(req.body.password);
  next();
}