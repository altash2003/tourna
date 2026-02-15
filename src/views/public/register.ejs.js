<div class="card">
  <h1>Player Registration</h1>
  <p><b>Approved Slots:</b> <%= approvedCount %> / <%= tournament.maxPlayers %></p>

  <% if (!tournament.registrationOpen) { %>
    <p class="status closed">Registration is CLOSED.</p>
  <% } else { %>
    <p class="status open">Registration is OPEN.</p>
  <% } %>

  <% if (error) { %>
    <p class="alert error"><%= error %></p>
  <% } %>

  <% if (success) { %>
    <p class="alert success"><%= success %></p>
  <% } %>

  <form method="POST" action="/register" class="form">
    <label>IGN (MLBB) *</label>
    <input name="mlbbIgn" required />

    <label>ML ID *</label>
    <input name="mlId" required />

    <label>Server ID *</label>
    <input name="serverId" required />

    <label>Role/Main (optional)</label>
    <input name="roleMain" />

    <label>IGN (Stick N' Trade) *</label>
    <input name="stickIgn" required />

    <button class="btn" type="submit">Submit Registration</button>
  </form>

  <p class="note">
    Note: Your registration will be marked as <b>PENDING</b> until the admin approves you.
  </p>
</div>
