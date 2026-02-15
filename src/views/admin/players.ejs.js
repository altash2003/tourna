<div class="card">
  <h1>Players - <%= status.toUpperCase() %></h1>
  <p><b>Approved Slots:</b> <%= approvedCount %> / <%= tournament.maxPlayers %></p>

  <div class="actions">
    <a class="btn secondary" href="/admin/players?status=pending">Pending</a>
    <a class="btn secondary" href="/admin/players?status=approved">Approved</a>
    <a class="btn secondary" href="/admin/players?status=declined">Declined</a>
    <a class="btn" href="/admin">Back</a>
  </div>

  <hr />

  <% if (!players || players.length === 0) { %>
    <p>No players in this category.</p>
  <% } else { %>
    <table class="table">
      <thead>
        <tr>
          <th>MLBB IGN</th>
          <th>ML ID</th>
          <th>Server</th>
          <th>Role</th>
          <th>Stick IGN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <% players.forEach(p => { %>
          <tr>
            <td><b><%= p.mlbbIgn %></b></td>
            <td><%= p.mlId %></td>
            <td><%= p.serverId %></td>
            <td><%= p.roleMain || "-" %></td>
            <td><%= p.stickIgn %></td>
            <td>
              <% if (status === "pending") { %>
                <form method="POST" action="/admin/players/<%= p._id %>/approve" style="display:inline;">
                  <button class="btnSmall" type="submit">Approve</button>
                </form>

                <form method="POST" action="/admin/players/<%= p._id %>/decline" style="display:inline;">
                  <button class="btnSmall danger" type="submit">Decline</button>
                </form>
              <% } %>

              <form method="POST" action="/admin/players/<%= p._id %>/delete" style="display:inline;">
                <button class="btnSmall danger" type="submit">Delete</button>
              </form>
            </td>
          </tr>
        <% }) %>
      </tbody>
    </table>
  <% } %>
</div>
