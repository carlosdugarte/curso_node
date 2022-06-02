const { config } = require('../../database/config/configMariaDB');
const Contenedor = require('../../database/db');
class Productos {

    constructor() {
       this.tableName = 'productos';
       this.dbconfig = config;
       this.db = new Contenedor(this.tableName, this.dbconfig);
       this.cargar();
    }

    cargar(){
        try{
            const cargar = async () => {
                const existe = await this.db.tableExists();
                if(!existe) await this.db.createTable();
            };
            cargar();
        } catch(error){
            console.log(error);
        }
    }

    save(obj){
        return this.db.insert(obj);
    }

    getAll(){
        return this.db.selectAll();
    }

    getById(id){
        if(!id) return false;
        return this.db.selectById(id);
    }

    update(id, obj){
        if (!id || !obj) {
            return false;
        }
        return this.db.update({...obj, id});
    }

    delete(id){
        if(!id) return false;
        return this.db.delete(id);
    }
}

module.exports = Productos;