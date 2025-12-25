const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["owner", "admin", "member", "billing_manager"],
    default: "member"
  },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  },

  plan: { type: String, default: "free" },
  subscriptionStatus: { type: String, default: "inactive" },

  stripeCustomerId: String,
});

module.exports = mongoose.model("User", userSchema);
