<div class="card">
  <h1>Admin Dashboard</h1>

  <div class="actions">
    <a class="btn secondary" href="/admin/players?status=pending">Pending Players</a>
    <a class="btn secondary" href="/admin/players?status=approved">Approved Players</a>
    <a class="btn secondary" href="/admin/players?status=declined">Declined Players</a>
  </div>

  <hr />

  <h2>Tournament Controls</h2>

  <form method="POST" action="/admin/tournament/open" style="display:inline;">
    <button class="btn" type="submit">Open Registration</button>
  </form>

  <form method="POST" action="/admin/tournament/close" style="display:inline;">
    <button class="btn danger" type="submit">Close Registration</button>
  </form>

  <hr />

  <h2>Randomizer</h2>

  <form method="POST" action="/admin/randomize/teams" style="display:inline;">
    <button class="btn" type="submit">Randomize Teams (A-F)</button>
  </form>

  <form method="POST" action="/admin/randomize/groups" style="display:inline;">
    <button class="btn" type="submit">Randomize Groups (A/B)</button>
  </form>

  <form method="POST" action="/admin/unlock/teams" style="display:inline;">
    <button class="btn danger" type="submit">Reset Teams & Groups</button>
  </form>

  <hr />

  <h2>Danger Zone</h2>
  <form method="POST" action="/admin/tournament/reset">
    <button class="btn danger" type="submit">Reset Tournament (Clear Teams/Groups)</button>
  </form>

  <form method="POST" action="/admin/tournament/clear-players">
    <button class="btn danger" type="submit">Clear ALL Players</button>
  </form>
</div>
