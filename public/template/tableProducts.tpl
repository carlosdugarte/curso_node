<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col">Descripcion</th>
    </tr>
  </thead>

  <tbody>
    {{#if productos}}
      {{#each productos}}
        <tr>
          <th scope="row">{{this.id}}</th>
          <td>{{this.nombre}}</td>
          <td>$ {{this.precio}}</td>
          <td><img
              style="width: 3rem"
              src={{this.thumbnail}}
              alt={{this.nombre}}
            /></td>
        </tr>
      {{/each}}
    {{else}}
      <tr>
        <td colspan="4">No hay productos</td>
      </tr>
    {{/if}}
  </tbody>
</table>