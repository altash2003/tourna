<div class="card">
  <h1>Mobile Legends Tournament</h1>
  <p><b>Format:</b> Group Stage + Playoffs (6 Teams)</p>
  <p><b>Slots:</b> <%= approvedCount %> / <%= tournament.maxPlayers %> Approved</p>

  <% if (tournament.registrationOpen) { %>
    <p class="status open">Registration: OPEN</p>
  <% } else { %>
    <p class="status closed">Registration: CLOSED</p>
  <% } %>

  <div class="actions">
    <a class="btn" href="/register">Register Now</a>
    <a class="btn secondary" href="/teams">View Teams</a>
    <a class="btn secondary" href="/groups">View Groups</a>
  </div>
</div>

<div class="card">
  <h2>Registration Fee</h2>
  <p><b>10,000 TradeCash (TC)</b></p>
  <p>Payment Source: <b>Stick N' Trade</b></p>
</div>
