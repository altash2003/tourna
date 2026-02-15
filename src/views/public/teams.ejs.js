<div class="card">
  <h1>Teams</h1>

  <% if (!teams || teams.length === 0) { %>
    <p>No teams generated yet. Please wait for admin randomizer.</p>
  <% } else { %>
    <div class="grid">
      <% teams.forEach(team => { %>
        <div class="teamBox">
          <h2>Team Slot <%= team.slot %></h2>

          <% if (!team.players || team.players.length === 0) { %>
            <p>No players assigned.</p>
          <% } else { %>
            <ul>
              <% team.players.forEach(p => { %>
                <li><b><%= p.mlbbIgn %></b> (Stick IGN: <%= p.stickIgn %>)</li>
              <% }) %>
            </ul>
          <% } %>
        </div>
      <% }) %>
    </div>
  <% } %>
</div>
