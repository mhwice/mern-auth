import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.utils.js";
import { generateVerificationCode } from "../utils/verifcation-code.utils.js";

export const hasUser = async (email) => !!(await User.findOne({ email }));

export const createUser = async (email, plaintextPassword, name) => {
  const user = new User({
    email,
    password: await hashPassword(plaintextPassword),
    name,
    verificationCode: generateVerificationCode(),
    verificationCodeExpiresAt: Date.now() + Number(process.env.VERIFCATION_CODE_EXPIRES_IN)
  });

  await user.save();
  return user;
}

export const getUser = async (email, plaintextPassword) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isSame = await comparePassword(plaintextPassword, user.password);
  if (!isSame) return null;
  return user;
}

export const verifyUser = async (email, verificationCode) => {
  const user = await User.findOne({ email });
  if (!user || user.verificationCode !== verificationCode || Date.now() > user.verificationCodeExpiresAt) return false;
  user.verificationCode = undefined;
  user.verificationCodeExpiresAt = undefined;
  user.isVerified = true;
  await user.save();
  return true;
}

export const getUserData = async (id) => {
  const user = await User.findById(id);
  if (!user) return null;
  return { email: user.email, isVerified: user.isVerified, name: user.name };
}
