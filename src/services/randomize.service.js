function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function assignPlayersToTeams(players) {
  const teamSlots = ["A", "B", "C", "D", "E", "F"];
  const teams = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: []
  };

  const shuffled = shuffleArray(players);

  let index = 0;
  for (const p of shuffled) {
    const slot = teamSlots[index % teamSlots.length];
    teams[slot].push(p);
    index++;
  }

  return teams;
}

function assignTeamsToGroups() {
  const teamSlots = ["A", "B", "C", "D", "E", "F"];
  const shuffled = shuffleArray(teamSlots);

  return {
    groupA: shuffled.slice(0, 3),
    groupB: shuffled.slice(3, 6)
  };
}

module.exports = {
  shuffleArray,
  assignPlayersToTeams,
  assignTeamsToGroups
};
