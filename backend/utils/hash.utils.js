import bcrypt from "bcrypt";

export const hashPassword = async (plaintextPassword) => {
  const NUM_SALT_ROUNDS = 10;
  return await bcrypt.hash(plaintextPassword, NUM_SALT_ROUNDS);
}

export const comparePassword = async (plaintextPassword, hashedPassword) => {
  return bcrypt.compare(plaintextPassword, hashedPassword);
}