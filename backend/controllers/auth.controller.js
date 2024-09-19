import { createJWT } from "../utils/token.utils.js";
import { createUser, hasUser, getUser, verifyUser, getUserData } from "../db/user.db.js";
import { sendVerificationEmail } from "../utils/email.utils.js";

export const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  // console.log(email, password, name)
  if (await hasUser(email)) next(new Error());
  const user = await createUser(email, password, name);
  // await sendVerificationEmail(user.email, user.verificationCode);

  // const jwt = createJWT({ id: user._id });
  // res.cookie("auth-token", jwt, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES_IN)),
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  // });

  res.status(201).json({ success: true });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUser(email, password);
  if (!user) return res.status(400).json({ success: false, errors: ["no user found"] });
  const jwt = createJWT({ id: user._id.toString() });

  res.status(201).json({ success: true, access_token: jwt });
};

export const logout = (req, res) => {
  res.send("<h1>Logout Page</h1>");
};

export const verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;
  const verified = await verifyUser(email, verificationCode);
  res.send({ success: verified });
};

export const getProfile = async (req, res) => {
  const { id } = res.locals;
  const userData = await getUserData(id);
  res.send({ success: true, profile: userData });
}
