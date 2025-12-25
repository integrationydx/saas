const router = require("express").Router();
const auth = require("../middlewares/auth");

// Placeholder usage routes
router.get("/", auth, async (req, res) => {
  res.json({ msg: "Usage endpoint" });
});

module.exports = router;
