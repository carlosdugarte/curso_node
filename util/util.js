const productos  = require('../data/productos');

class GeneradorId {
    constructor() {
        this.lastId = findLastId();
    }

    getNextId() {
        this.lastId++;
        return this.lastId;
    }
}

function findLastId() {
    const maxID = productos.length > 0 ? Math.max(...productos.map(producto => producto.id)) : 0;
    return maxID;
}

module.exports = GeneradorId;