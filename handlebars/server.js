const express = require('express')
const { Router } = express;
const handlebars = require('express-handlebars')
var Contenedor = require('./Contenedor.js')

//Instance contenedor
const productos = new Contenedor('./productos.txt')

//Create express server
const app = express()

//middlewares
app.use(express.json())    
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }))

//template handlebar
app.engine('handlebars', handlebars.engine({defaultLayout: 'main.handlebars'}))
app.set('views', './views')
app.set('view engine', 'handlebars')

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
        res.redirect('/')
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
})
//END endopoints TEMPLATES

//set routes
app.use('/productos', routerTemplate);

//listener
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
