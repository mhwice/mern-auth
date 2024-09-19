export const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const errorMessages = errors.array().map((error) => error.msg);
  console.log(errorMessages)
  throw new Error();
}
