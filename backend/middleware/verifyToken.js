export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || token !== process.env.SECRET) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized access" });
  }

  next();
};
