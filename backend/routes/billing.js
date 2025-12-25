const router = require("express").Router();
const auth = require("../middlewares/auth");

// Placeholder billing routes
router.get("/", auth, async (req, res) => {
  res.json({ msg: "Billing endpoint" });
});

module.exports = router;
