const Carrito = require('../models/Carrito');

const cart = new Carrito();

const createCartController = async (req, res) => { //OK
    const response = await cart.createCart();
    if (response.error) return res.status(404).send(response.error);
    return res.json({ id: response });
};

const deleteCartController = async (req, res) => { //OK
    const { id } = req.params;
    if (!id) return res.status(400).send(`id is missing from params: ${JSON.stringify(req.params)}`);
    const response = await cart.deleteCart(id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const getCartController = async (req, res) => { //OK
    const { id } = req.params
    if (!id) return res.status(400).send(`id is missing from params: ${JSON.stringify(req.params)}`);
    
    const response = await cart.getCart(id);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const addProductController = async (req, res) => { //OK

    const  cartId  = req.params.id;
    const  productId  = req.body.id;

    console.log("cartId: " +cartId + " produtId: " + productId);

    if (!cartId) return res.status(400).send({ error : `ID del carrito falta desde params` });   
    if (!productId) return res.status(400).send({ error : `ID del producto falta desde body` });

    const response = await cart.addProduct(cartId, productId);
    if(response.error) return res.status(404).send(response.error);

    return res.json(response);

};

const removeProductController = async (req, res) => {
    const { id: cartId, id_prod: productId } = req.params;

    if (!cartId || !productId) 
        return res.status(400).send({ error : `ID del carrito  ó del producto falta desde params` });

    const response = await cart.removeProduct(cartId, productId);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

module.exports = {
    cart,
    createCartController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController
}