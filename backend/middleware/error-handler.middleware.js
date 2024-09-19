export default (err, req, res, next) => {
  console.log("in errormidd")
  const statusCode = err.statusCode || 500;
  const msg = err.message || "something went wrong";
	res.status(statusCode).json({ msg });
}
