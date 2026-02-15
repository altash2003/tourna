const express = require("express");
const requireAdmin = require("../middleware/requireAdmin");

const Player = require("../models/Player");
const Team = require("../models/Team");
const Group = require("../models/Group");

const { getTournament } = require("../services/tournament.service");
const {
  assignPlayersToTeams,
  assignTeamsToGroups
} = require("../services/randomize.service");

const router = express.Router();

router.post("/randomize/teams", requireAdmin, async (req, res) => {
  const tournament = await getTournament();

  if (tournament.teamsLocked) {
    return res.redirect("/admin");
  }

  const approvedPlayers = await Player.find({ status: "approved" });

  if (approvedPlayers.length !== tournament.maxPlayers) {
    return res.redirect("/admin");
  }

  await Team.deleteMany({});

  const teamsData = assignPlayersToTeams(approvedPlayers);

  const slots = ["A", "B", "C", "D", "E", "F"];

  for (const slot of slots) {
    await Team.create({
      slot,
      players: teamsData[slot].map((p) => p._id)
    });
  }

  tournament.teamsLocked = true;
  await tournament.save();

  return res.redirect("/admin");
});

router.post("/randomize/groups", requireAdmin, async (req, res) => {
  const tournament = await getTournament();

  if (!tournament.teamsLocked || tournament.groupsLocked) {
    return res.redirect("/admin");
  }

  await Group.deleteMany({});

  const { groupA, groupB } = assignTeamsToGroups();

  await Group.create({ name: "A", teamSlots: groupA });
  await Group.create({ name: "B", teamSlots: groupB });

  tournament.groupsLocked = true;
  await tournament.save();

  return res.redirect("/admin");
});

router.post("/unlock/teams", requireAdmin, async (req, res) => {
  const tournament = await getTournament();
  tournament.teamsLocked = false;
  tournament.groupsLocked = false;
  await tournament.save();

  await Team.deleteMany({});
  await Group.deleteMany({});

  return res.redirect("/admin");
});

module.exports = router;
