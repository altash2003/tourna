const express = require("express");
const requireAdmin = require("../middleware/requireAdmin");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Group = require("../models/Group");
const { getTournament } = require("../services/tournament.service");

const router = express.Router();

router.post("/tournament/open", requireAdmin, async (req, res) => {
  const t = await getTournament();
  t.registrationOpen = true;
  await t.save();
  return res.redirect("/admin");
});

router.post("/tournament/close", requireAdmin, async (req, res) => {
  const t = await getTournament();
  t.registrationOpen = false;
  await t.save();
  return res.redirect("/admin");
});

router.post("/tournament/reset", requireAdmin, async (req, res) => {
  await Team.deleteMany({});
  await Group.deleteMany({});

  const t = await getTournament();
  t.teamsLocked = false;
  t.groupsLocked = false;
  await t.save();

  return res.redirect("/admin");
});

router.post("/tournament/clear-players", requireAdmin, async (req, res) => {
  await Player.deleteMany({});
  await Team.deleteMany({});
  await Group.deleteMany({});

  const t = await getTournament();
  t.registrationOpen = true;
  t.teamsLocked = false;
  t.groupsLocked = false;
  await t.save();

  return res.redirect("/admin");
});

module.exports = router;
