const router = require("express").Router();
const Organization = require("../models/org");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const { requireRole } = require("../middlewares/roles");

// CREATE ORG (owner)
router.post("/create", auth, async (req, res) => {
  const org = await Organization.create({
    name: req.body.name,
    owner: req.userId,
    members: [{ user: req.userId, role: "owner" }],
  });

  await User.findByIdAndUpdate(req.userId, {
    organization: org._id,
    role: "owner",
  });

  res.json(org);
});

// INVITE MEMBER
router.post(
  "/invite",
  auth,
  requireRole(["owner", "admin"]),
  async (req, res) => {
    const { email, role } = req.body;

    const invitee = await User.findOne({ email });
    if (!invitee) return res.status(400).json({ msg: "User not found" });

    await Organization.findByIdAndUpdate(req.organizationId, {
      $push: { members: { user: invitee._id, role } },
    });

    invitee.organization = req.organizationId;
    invitee.role = role;
    await invitee.save();

    res.json({ msg: "User added to organization" });
  }
);

module.exports = router;
