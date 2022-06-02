const express = require('express');
const router = express.Router();

const {
    getAllController,
    getByIdController,
    saveController,
    updateController,
    deleteController
} = require('../../controllers/productos/productos.controller');
//ruta raiz


router.get('/', getAllController);

router.get('/:id', getByIdController);

router.post('/', saveController);

router.put('/:id', updateController);

router.delete('/:id', deleteController);

module.exports = router;