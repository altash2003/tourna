const express = require("express");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Group = require("../models/Group");
const { getTournament } = require("../services/tournament.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const tournament = await getTournament();
  const approvedCount = await Player.countDocuments({ status: "approved" });

  return res.render("public/home", {
    title: "MLBB Tournament Organizer",
    tournament,
    approvedCount
  });
});

router.get("/register", async (req, res) => {
  const tournament = await getTournament();
  const approvedCount = await Player.countDocuments({ status: "approved" });

  return res.render("public/register", {
    title: "Register",
    tournament,
    approvedCount,
    error: null,
    success: null
  });
});

router.post("/register", async (req, res) => {
  const tournament = await getTournament();
  const approvedCount = await Player.countDocuments({ status: "approved" });

  if (!tournament.registrationOpen) {
    return res.render("public/register", {
      title: "Register",
      tournament,
      approvedCount,
      error: "Registration is currently CLOSED.",
      success: null
    });
  }

  const { mlbbIgn, mlId, serverId, roleMain, stickIgn } = req.body;

  if (!mlbbIgn || !mlId || !serverId || !stickIgn) {
    return res.render("public/register", {
      title: "Register",
      tournament,
      approvedCount,
      error: "Please fill in all required fields.",
      success: null
    });
  }

  await Player.create({
    mlbbIgn,
    mlId,
    serverId,
    roleMain,
    stickIgn,
    status: "pending"
  });

  return res.render("public/register", {
    title: "Register",
    tournament,
    approvedCount,
    error: null,
    success: "Registration submitted! Please wait for admin approval."
  });
});

router.get("/teams", async (req, res) => {
  const teams = await Team.find().populate("players");
  return res.render("public/teams", {
    title: "Teams",
    teams
  });
});

router.get("/groups", async (req, res) => {
  const groups = await Group.find();
  return res.render("public/groups", {
    title: "Groups",
    groups
  });
});

module.exports = router;
