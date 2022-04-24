const express = require('express')
var Contenedor = require('./Contenedor.js')

//Create express server
const app = express()

//Instance contenedor
const productos = new Contenedor('./productos.txt')

//end points
//1. Get all products
app.get('/productos', async (req, res) => {
    const prods = await productos.getAll()
    res.send(prods)
})

//2.Get random product
app.get('/productoRandom', async (req, res) => {
    const prods = await productos.getAll()
    const random = parseInt(Math.random() * prods.length)
    res.send(prods[random])
})

//listener
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
