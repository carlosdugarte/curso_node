const express = require('express')
const { Router } = express;
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
var Contenedor = require('./Contenedor.js')

//Instance contenedor
const productos = new Contenedor('./productos.txt')

//
const mensajes = [];

//Create express server
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//middlewares
app.use(express.json())    
app.use(express.static('public'));              //para dejar estática la carpeta public
app.use(express.urlencoded({ extended: true })) //para utilizar formato json, sino se interpreta como string

//template pug
app.set('views', './views')
app.set('view engine', 'pug')

//Create router
const routerTemplate = Router();

//BEGIN endpoints TEMPLATES
//2.1. GET /productos/
routerTemplate.get('/', async (req, res) => {
    const prods = await productos.getAll()
    res.render('productos.pug', { products: prods, existProducts: prods.length }); 
})

// app.get('/', (req, res) => {
//     res.sendFile('index.html', {root: __dirname})
// })

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
        res.redirect('/')
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

    socket.on('mensaje', data => {

        console.log(data);
        mensajes.push(data)
        io.sockets.emit('mensajes', mensajes)
    })
})


//listener
const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
