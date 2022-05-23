const express = require('express')
const { Router } = express;
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
var Contenedor = require('./Contenedor.js')

//Instance contenedor
const productos = new Contenedor('./data/productos.txt')

//array de mensajes
const mensajes = [];

//Create express server
const app = express()
const httpServer = new HttpServer(app)  //create httpserver
const io = new IOServer(httpServer)     //create io 

//middlewares
app.use(express.json())    
app.use(express.static('public'));              //para dejar estática la carpeta public
app.use(express.urlencoded({ extended: true })) //para utilizar formato json, sino se interpreta como string

//Create router
const routerTemplate = Router();

//BEGIN endpoints TEMPLATES
//2.1. GET /productos/
routerTemplate.get('/', async (req, res) => {
    const prods = await productos.getAll()
    res.render('datos', { products: prods, existProducts: prods.length });    
})

//2.2. POST /productos/
routerTemplate.post('/', async (req, res) =>{

    const { title, price, thumbnail } = req.body;

    const nuevoProducto = {
        title,
        price, 
        thumbnail
    }

    let guardar = productos.save(nuevoProducto);

    guardar.then((data) => {
        res.json(nuevoProducto);
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
})

//END endopoints TEMPLATES

//set routes
app.use('/productos', routerTemplate);

//comunicación websocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!')

    socket.emit('mensajes', mensajes)

    productos.getAll().then((data) => {
        io.sockets.emit('productos', data )
    })

    socket.on('mensaje', data => {
        console.log(data);
        mensajes.push(data)
        io.sockets.emit('mensajes', mensajes)
    })

    socket.on('postProducto', () => {
        console.log('update correcto');
        productos.getAll().then((data) => {
            io.sockets.emit('productos', data )
        })
    })
})

//listener
const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
