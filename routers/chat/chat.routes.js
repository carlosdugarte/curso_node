const express = require('express');
const router = express.Router();

const {
    getAllController,
    saveController,
} = require('../../controllers/chat/chat.controller');

//ruta raiz
router.get('/', getAllController);
router.post('/', saveController);

module.exports = router;