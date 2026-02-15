const express = require("express");
const Player = require("../models/Player");
const { getTournament } = require("../services/tournament.service");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

router.get("/", requireAdmin, async (req, res) => {
  return res.render("admin/dashboard", {
    title: "Admin Dashboard"
  });
});

router.get("/players", requireAdmin, async (req, res) => {
  const status = req.query.status || "pending";

  const players = await Player.find({ status }).sort({ createdAt: -1 });
  const tournament = await getTournament();
  const approvedCount = await Player.countDocuments({ status: "approved" });

  return res.render("admin/players", {
    title: "Players",
    players,
    status,
    tournament,
    approvedCount
  });
});

router.post("/players/:id/approve", requireAdmin, async (req, res) => {
  const tournament = await getTournament();
  const approvedCount = await Player.countDocuments({ status: "approved" });

  if (approvedCount >= tournament.maxPlayers) {
    return res.redirect("/admin/players?status=pending");
  }

  await Player.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });

  return res.redirect("/admin/players?status=pending");
});

router.post("/players/:id/decline", requireAdmin, async (req, res) => {
  await Player.findByIdAndUpdate(req.params.id, {
    status: "declined"
  });

  return res.redirect("/admin/players?status=pending");
});

router.post("/players/:id/delete", requireAdmin, async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  return res.redirect("/admin/players?status=pending");
});

module.exports = router;
