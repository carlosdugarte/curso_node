const express = require('express');
const router = express.Router();

//Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//ruta raiz
router.use('/productos', require('./productos/productos.routes'));
router.use('/chat', require('./chat/chat.routes'));


module.exports = router