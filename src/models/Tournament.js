const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema(
  {
    maxPlayers: { type: Number, default: 30 },
    registrationOpen: { type: Boolean, default: true },

    teamsLocked: { type: Boolean, default: false },
    groupsLocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", TournamentSchema);
