const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["A", "B"],
      required: true
    },
    teamSlots: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
