<div class="thumbnail">
  <% if (org.avatar_url !== undefined) { %>
    <img src="<%= org.avatar=url %>"  data-src="holder.js/300x200">
  <% } %>
  <h3><%= repo.name %></h3>
  <p><a href="<%= repo.url %>"><%= repo.url %></a></p>
</div>