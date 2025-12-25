const User = require("../models/User");

const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  };
};

module.exports = { requireRole };

module.exports.requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    next();
  };
};

