const Tournament = require("../models/Tournament");

async function getTournament() {
  let t = await Tournament.findOne();
  if (!t) {
    t = await Tournament.create({
      maxPlayers: 30,
      registrationOpen: true,
      teamsLocked: false,
      groupsLocked: false
    });
  }
  return t;
}

module.exports = { getTournament };
