const fs = require('fs/promises');
const { resolve } = require('path');

var Productos = require('../models/Productos');
const productos = new Productos('./data/productos.txt');

const filePath = './data/';
const fileName = 'carts.txt'


class Carrito {
    async getFileData() { 
        try {
            const data = await fs.readFile(`${filePath}${fileName}`, 'utf-8');
            return JSON.parse(data);
        } catch(error) {
            console.error('getFileData() error:', error.message);
            return error;            
        }
    }
    async saveFileData(data) {
        try {   
            await fs.writeFile(`${filePath}${fileName}`, JSON.stringify(data, null, 2));
            return data;
        } catch(error) {
            console.error('saveFileData() error:', error.message);
            return error;
        }
    }
    async createCart() { 
        const data = await this.getFileData();
        const timestamp = Date.now();

        let newId = 1;
        if(data.length > 0 ) newId = data[data.length - 1].id + 1;
 
        const cart = { id: newId, timestamp, productos: [] };
        data.push(cart);
        await this.saveFileData(data);
        return cart.id;
    }

    async deleteCart(id) { 
        //buscar carrito
        const data = await this.getFileData();
        const index = data.findIndex(cart => cart.id === parseInt(id));
        if (index < 0) return { error: `Carrito con id ${id} no encontrado` };

        //update stock
        const arrayproductos = data[index].productos;
        arrayproductos.forEach( async (item) => {   
            console.log('entra for each')
            try{
                await this.updateStockProductos(item.id, true);
            }catch(err){
                return { error: `${err}` } 
            }   
        })

        //Borrar carrito
        data.splice(index, 1);
        const saveData = await this.saveFileData(data);

        return saveData;
    }

    async getCart(id) {        
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(id));
        if (cart) return cart;
        return {error: `Carrito con id ${id} no encontrado`};
    }

    async addProduct(cartId, productId) {

        //buscar carrito
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Carrito con id ${cartId} no encontrado` }

        //buscar producto
        let product;
        try{
            product = await productos.getById(productId);
        }catch(error){
            return { error: `Producto con id ${productId} no encontrado` }
        }

        if(typeof(product) == 'undefined') return { error: `Producto con id ${productId} no encontrado` }

        //update stock
        if(product.stock <= 0) return { error: `stock de producto id ${productId} NO DISPONIBLE` }
        
        try{
            await this.updateStockProductos(productId, false); //decrementar el stock de producto 
        }catch(err){
            return { error: `${err}` } 
        }   

        //cargar el carrito
        cart.productos.push(product);
        await this.saveFileData(data);
        console.log('producto: '+product);

        return cart;

    }

    async removeProduct(cartId, productId) {
        const data = await this.getFileData();

        console.log('data' + data);
        console.log('data' + JSON.stringify(data));


        //buscar carrito
        const cart = data.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Carrito con id ${cartId} no encontrado` };

        //buscar producto
        const productIndex = cart.productos.findIndex(product => product.id === parseInt(productId));
        if (productIndex < 0 ) return { error: `Producto con id ${productId} no encontrado` }; 

        //Eliminar producto
        cart.productos.splice(productIndex, 1);
        try{
            await this.saveFileData(data);
        }catch(err){
            return { error: `${err}` }; 
        }
        
        //update stock
        try{
            await this.updateStockProductos(productId, true); //incrementar el stock de producto 
        }catch(err){
            return { error: `${err}` } 
        }   

        return cart;
    }


    async updateStockProductos(productId, incrementar){

        //buscar producto
        let product;
        try{
            product = await productos.getById(productId);
        }catch(error){
            return { error: `Producto con id ${productId} no encontrado` }
        }
        console.log('update stock product: ' +product)

        //actualizar stock
        try{
            if(incrementar){
                product.stock = product.stock + 1;
            }else{
                product.stock = product.stock - 1;    
            }
            console.log('Antes de acutalizar: '+JSON.stringify(product));
            await productos.update(product);
            console.log('Despues de acutalizar: '+JSON.stringify(product));

        }catch(err){
            return { error: `${err}` } 
        }     
    }

}
module.exports = Carrito;