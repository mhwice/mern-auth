import { checkSchema, checkExact, validationResult } from "express-validator";

export const registerSchema = {
  email: {
    notEmpty: { errorMessage: "Email is requried" },
    isEmail: { errorMessage: "Email must be properly formatted" },
  },
  password: {
    notEmpty: { errorMessage: "Password is requried" },
    isString: { errorMessage: "password should be string" },
    isLength: {
      options: { min: 8, max: 128 },
      errorMessage: "Password must be betwen 8 and 128 characters",
    },
    matches: {
      options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,128}$/,
      errorMessage: "Password must contain one uppercase, lowercase, and special character"
    }
  },
  name: {
    notEmpty: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name should be string" },
  },
};

export const loginSchema = {
  email: {
    notEmpty: { errorMessage: "Email is requried" },
    isEmail: { errorMessage: "Email must be properly formatted" },
  },
  password: {
    notEmpty: { errorMessage: "Password is requried" },
    isString: { errorMessage: "password should be string" },
    isLength: {
      options: { min: 8, max: 128 },
      errorMessage: "Password must be betwen 8 and 128 characters",
    },
    matches: {
      options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,128}$/,
      errorMessage: "Password must contain one uppercase, lowercase, and special character"
    }
  }
};

export const verifySchema = {
  email: {
    notEmpty: { errorMessage: "Email is requried" },
    isEmail: { errorMessage: "Email must be properly formatted" },
  },
  verificationCode: {
    notEmpty: { errorMessage: "Verification code is requried" },
    isNumeric: { errorMessage: "Verification code must contain only numbers" },
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: "Verification code must be 6 digits",
    }
  }
};

export const validate = (schema) => async (req, res, next) => {
  await checkExact(checkSchema(schema)).run(req);
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.status(400).json({ success: false, errors: errors.array().map((error) => error.msg) });
};
