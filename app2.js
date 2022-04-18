const { promises: fs } = require('fs');

class Contenedor {

    //1. constructor
    constructor(ruta) {
        this.ruta = ruta;
    }

    //2. guardar objeto
    async save(obj) {

        const objs = await this.getAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    //3. Obtener objeto por id
    async getById(id) {
        const objs = await this.getAll()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }

    //4. Obtener todos los objetos
    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    //5. Borrar objeto por ID
    async deleteById(id) {
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    //6. Borrar todos los objetos
    async deleteAll() {
        await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
}


//Testear métodos

//Instacia contenedor
const contenedor = new Contenedor('productos.txt');

//1. getById(Number)
// (async () => {  /****** Descomentar para probar ******/
//     console.log(await contenedor.getById(1))
// })();

//2. getAll()
// (async () => {  /****** Descomentar para probar ******/
//     console.log(await contenedor.getAll())
// })();

//3. deleteById(Number)
// contenedor.deleteById(4); /****** Descomentar para probar ******/

//4. deleteAll()
// contenedor.deleteAll();  /****** Descomentar para probar ******/

//5. save(Object)
// const obj = {           /****** Descomentar para probar ******/
//     "title": "carlos",
//     "price": 999,
//     "thumbnail": "url5"
// };

//contenedor.save(obj); /****** Descomentar para probar ******/

