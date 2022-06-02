const knex = require('knex');

class Contenedor {

    constructor(tableName, dbconfig) {
        this.db = knex(dbconfig);
        this.tableName = tableName;
    }

    async createTable() {
        switch (this.tableName) {
            case 'productos': {
                try {
                    const result = await this.db.schema.createTable('productos', (table) => {
                        table.increments('id').primary();
                        table.string('nombre');
                        table.integer('precio');
                        table.string('thumbnail');
                    });
                    console.log('Tabla Creada');
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }
            break;
            case 'chat': {
                try {
                    const result = await this.db.schema.createTable('chat', (table) => {
                        table.increments('id').primary();
                        table.string('email');
                        table.string('message');
                        table.date('date');
                    });
                    console.log('Tabla Creada');
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }
            break;
            default: {
                console.log('No existe la tabla');
            }
            break;
        }
    }

    async selectAll() {
        try{
            const result = await this.db.from(this.tableName).select('*')
            return (result) ? result : false;
        } catch (error) {
            console.log(error);
        }
    }

    async selectById(id) {
        try{
            const result = await this.db.from(this.tableName).select('*')
            .where('id', id)
            return (result) ? result : false;
        } catch (err) {
            console.log(err);
        }
    }

    async insert(obj) {
        try{
            const result = await this.db(this.tableName).insert(obj);
            console.log('Producto Agregado: ', result);
            return (result) ? result : false;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 
     * No eran necesarios los metodos update y delete pero los deje igual por si en un futuro se necesitan
     */

    async update(obj) {
        try{
            const result = await this.db(this.tableName)
            .where('id', obj.id)
            .update(obj);
            console.log('Producto Actualizado: ', result);
            return (result) ? result : false;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try{
            const result = this.db.from(this.tableName)
            .where('id', id)
            .del()
            return (result) ? result : false;
        } catch (error) {
            console.log(error);
        }
    }

    async tableExists() {
        try{
            const result = await this.db.schema.hasTable(this.tableName)
            return (result) ? true : false;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;