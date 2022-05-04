const express = require('express')
const { Router } = express;
var Contenedor = require('./Contenedor.js')

//Instance contenedor
const productos = new Contenedor('./productos.txt')

//Create express server
const app = express()

//middlewares
app.use(express.json())    
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }))

//Create router
const router = Router();

//end points
//1. GET /api/productos/
router.get('/', async (req, res) => {
    const prods = await productos.getAll()
    res.send(prods)
})

//2. GET /api/productos/:id
router.get('/:id', async (req, res) => {
    let response;
    const id = req.params.id;
    
    response = await productos.getById(id);

    if(!response) return res.status(400).json({error: `Producto con id ${id} no encontrado`})
    else return res.json(response);

})

//3. POST /api/productos/
router.post('/', async (req, res) =>{

    const { title, price, thumbnail } = req.body;

    const nuevoProducto = {
        title,
        price, 
        thumbnail
    }

    let guardar = productos.save(nuevoProducto);

    guardar.then((data) => {
        res.json(nuevoProducto)
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
})


//4. PUT /api/productos/:id
router.put('/:id', async (req, res) => {

    const  id = req.params.id;
    const { title,  price, thumbnail } = req.body;

    const productoActualizar = {
        title,
        price, 
        thumbnail,
        id
    }

    let actualizar = productos.update(productoActualizar);

    actualizar.then((data) => {
        res.json(productoActualizar)
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
})


//5. DELETE /api/productos/:id
router.delete('/id', async (req, res) => {

    const id = req.params.id;

    let borrar = productos.deleteById(id);

    borrar.then(() => {
        res.json({mensaje: "producto eliminado"})
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
})

//set router
app.use('/api/productos', router);

//listener
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
