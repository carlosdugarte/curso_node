<ul class="list-group" id="listaMensajes">
  {{#if chat}}
    {{#each chat}}
      <li class="list-group-item">
        <div class="row">
          <div class="col-md-12">
            <span
              class="text-primary fw-bold"
              style="font-size: small;"
            >{{this.email}}</span>
            <span style="color:#804000; font-size:small">[{{this.date}}]</span>
            <span class="text-success fst-italic"> : {{this.message}}</span>
          </div>
        </div>
      </li>
    {{/each}}
  {{else}}
    <li class="list-group-item">
      <div class="row">
        <div class="col-md-12">
          <span class="text-primary fw-bold">No hay mensajes</span>
        </div>
      </div>
    </li>
  {{/if}}
</ul>