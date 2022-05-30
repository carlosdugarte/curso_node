const express = require("express");
const app = express();

const rutasApi = require('../routers/app.routes');

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Definición de ruta
app.use('/api', rutasApi);

//Si la ruta no existe
app.use('*', (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: 'la ruta ' + req.baseUrl + ' no existe'
    });
});

//listener server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
