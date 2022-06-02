const { Productos } = require('../../models/index');
const productos = new Productos();

const getAllController = async (req, res) => {
    const producto = await productos.getAll();
    return res.status(200).json(producto);
};

const getByIdController = async (req, res) => {
    const { id } = req.params;
    const producto = await productos.getById(id);

    if (producto) 
        return res.status(200).json(producto);

    return res.status(404).json({ 
        error: 'Producto no encontrado'
    });
};

const saveController = async (req, res) => {
    const { nombre, precio, thumbnail } = req.body;

    if (nombre && precio && thumbnail) {
        await productos.save({ nombre, precio, thumbnail });
        return res.status(201).redirect('/');
    }

    return res.status(400).json({
        error: 'Datos incompletos'
    });
};

const updateController = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, thumbnail } = req.body;

    if (nombre && precio && thumbnail) {
        await productos.update(id, { nombre, precio, thumbnail });
        return res.status(200).send('Producto actualizado con exito');
    }

    return res.status(400).json({
        error: 'Datos incompletos'
    });
}

const deleteController = async (req, res) => {
    const { id } = req.params;
    if(id){
        const respuesta = await productos.delete(id);
        return (respuesta) 
        ? res.status(200).json({ mensaje : 'Producto eliminado exitosamente'}) 
        : res.status(404).json({ error : 'Producto no encontrado'});
    }
    return res.status(400).json({ error : 'No se encontro el id'});
}

module.exports = {
    getAllController,
    getByIdController,
    saveController,
    updateController,
    deleteController
}
