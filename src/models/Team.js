const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    slot: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
      required: true
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
