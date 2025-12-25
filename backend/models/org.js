const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  plan: { type: String, default: "free" },
  subscriptionStatus: { type: String, default: "inactive" },

  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["owner", "admin", "member", "billing_manager"],
        default: "member",
      },
    },
  ],
});

module.exports = mongoose.model("Organization", organizationSchema);
