const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    mlbbIgn: { type: String, required: true, trim: true },
    mlId: { type: String, required: true, trim: true },
    serverId: { type: String, required: true, trim: true },
    roleMain: { type: String, default: "", trim: true },

    stickIgn: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending"
    },

    adminNote: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);
