## 0) CONSIGNA

Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

```
// crear la carpeta ecommerce en ruta.
--dbpath=/ruta/ecommerce
```

```
mongo
use ecommerce
```

## Puntos

1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

```
db.mensajes.insertMany([
  {email: "carlos@gmail.com", message: "hola soy carlos", timestamp: ISODate()},
  {email: "eduardo@gmail.com", message: "hola soy eduardo", timestamp: ISODate()},
  {email: "dugarte@gmail.com", message: "hola soy dugarte", timestamp: ISODate()},
  {email: "paredes@gmail.com", message: "hola soy paredes", timestamp: ISODate()},
  {email: "ender@gmail.com", message: "hola soy ender", timestamp: ISODate()},
  {email: "jose@gmail.com", message: "hola soy jose", timestamp: ISODate()},
  {email: "mejia@gmail.com", message: "hola soy mejia", timestamp: ISODate()},
  {email: "carrizo@gmail.com", message: "hola soy carrizo", timestamp: ISODate()},
  {email: "javier@gmail.com", message: "hola soy javier", timestamp: ISODate()},
  {email: "andrea@gmail.com", message: "hola soy andrea", timestamp: ISODate()}
])

db.productos.insertMany([
  {title: "Combo de 14 tequeños medianos", price: 700, thumbnail: "https://i.ibb.co/6BCx9Q5/teque1.png"},
  {title: "Combo de 6 tequeños medianos", price: 64, thumbnail: "https://i.ibb.co/jHhQCBF/teque2.png"},
  {title: "Combo de 5 tequeños medianos", price: 100, thumbnail: "https://i.ibb.co/Dt3sP0n/teque3.png"},
  {title: "Combo de 4 tequeños mini", price: 150, thumbnail: "https://i.ibb.co/SvDs8yr/teque4.png"},
  {title: "Arepa Reina pepiada", price: 200, thumbnail: "https://i.ibb.co/BKBKJ8B/teque5.jpg"},
  {title: "Arepa Pelua", price: 150, thumbnail: "https://i.ibb.co/4djvLBK/teque6.jpg"},
  {title: "Arepa de pabellón", price: 120, thumbnail: "https://i.ibb.co/rxxbxrh/teque8.jpg"},
  {title: "Arepa dominó", price: 2500, thumbnail: "https://i.ibb.co/HhSz2nk/teque7.jpg"},
  {title: "Arepa de huevo", price: 900, thumbnail: "https://i.ibb.co/HhSz2nk/teque7.jpg"},
  {title: "Areoa de Cazón", price: 800, thumbnail: "https://i.ibb.co/HhSz2nk/teque7.jpg"},
])
```

3. Listar todos los documentos en cada colección.

```
db.mensajes.find()
db.productos.find()
```

4. Mostrar la cantidad de documentos almacenados en cada una de ellas.

```
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()
```

5. Realizar un CRUD sobre la colección de productos:

a) Agregar un producto más en la colección de productos

```
db.productos.insert({title: "Combo de tequeños MAXI", price: 3200, thumbnail: "https://i.ibb.co/6BCx9Q5/teque1.png"})

```

b) Realizar una consulta por nombre de producto específico:

- Listar los productos con precio menor a 1000 pesos.
- ii) Listar los productos con precio entre los 1000 a 3000 pesos.
- iii) Listar los productos con precio mayor a 3000 pesos.
- iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```
db.productos.find({price: {$lt: 1000}})
db.productos.find({price: {$in: [1000, 3000]}})
db.productos.find({price: {$gt: 3000}})
db.productos.find({}, {"title": 1}).sort({price: 1}).skip(2).limit(1)
```

c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```
db.productos.update({},{$set:{stock:100}},{upsert:false,multi:true})
```

d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

```
db.productos.update({price: {$gt: 4000}},{$set:{stock:0}},{upsert:false,multi:true})
```

e) Borrar los productos con precio menor a 1000 pesos

```
db.productos.deleteMany({price: {$lt: 1000}})
```

6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

```
use admin
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})
```

```
mongo -u pepe -p asd456
use ecommerce
db.productos.find()
```
