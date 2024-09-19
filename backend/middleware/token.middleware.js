import { verifyJWT } from "../utils/token.utils.js";

export const parseToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({ success: false, msg: "bad header" });
  const { id, iat, exp } = verifyJWT(token);
  if (Date.now() > exp * 1000) return res.status(401).send({ success: false, msg: "old token" });
  if (!id) return res.status(401).send({ success: false, msg: "bad token" });
  res.locals.id = id;
  next();
};
