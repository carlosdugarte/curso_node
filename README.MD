# INITIALIZE THE CHALLENGE

# 1. Please execute the following script to start the server in port 8080
node src/server.js or npm run start

# 2. Call the endpoints in postman

# PRODUCTS

GET: Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)

http://localhost:8080/api/productos/:id?

POST: Para incorporar productos al listado (disponible para administradores)

http://localhost:8080/api/productos

PUT:  Actualiza un producto por su id (disponible para administradores)

http://localhost:8080/api/productos/:id

DELETE: Borra un producto por su id (disponible para administradores)

http://localhost:8080/api/productos/:id

# CART

POST: Crea un carrito y devuelve su id.

http://localhost:8080/api/carrito

DELETE: Vacía un carrito y lo elimina.

http://localhost:8080/api/carrito/:id

GET: Me permite listar todos los productos guardados en el carrito

http://localhost:8080/api/carrito/:id/productos

POST: Para incorporar productos al carrito por su id de producto

http://localhost:8080/api/carrito/:id/productos

DELETE: Eliminar un producto del carrito por su id de carrito y de producto

http://localhost:8080/api/carrito/:id/productos/:id_prod

