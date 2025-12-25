const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.userId = user._id;
    req.role = user.role;
    req.organizationId = user.organization;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
