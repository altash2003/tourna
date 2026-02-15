<div class="card">
  <h1>Groups</h1>

  <% if (!groups || groups.length === 0) { %>
    <p>No groups generated yet.</p>
  <% } else { %>
    <div class="grid">
      <% groups.forEach(g => { %>
        <div class="teamBox">
          <h2>Group <%= g.name %></h2>
          <ul>
            <% g.teamSlots.forEach(slot => { %>
              <li><b>Team Slot <%= slot %></b></li>
            <% }) %>
          </ul>
        </div>
      <% }) %>
    </div>
  <% } %>
</div>
