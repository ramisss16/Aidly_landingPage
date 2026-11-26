const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "Token Not Found",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "aidlyAdmin") {
      return res.status(403).json({
        error: "Forbidden: Aidly Admin access required",
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

module.exports = adminAuthMiddleware;