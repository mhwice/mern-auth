import { verifyJWT } from "../utils/token.utils.js";

export const parseCookies = (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (!token) throw new Error();
  const { id } = verifyJWT(token); // throws an error if tampered with
  res.locals.id = id;
  next();
}