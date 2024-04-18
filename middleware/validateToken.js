const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded.user;

    next();
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = validateToken;
