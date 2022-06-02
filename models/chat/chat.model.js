const { config } = require('../../database/config/configSQLite3');
const Contenedor = require('../../database/db');
class ChatApi {
    
    constructor() {
        this.tableName = 'chat';
        this.db = new Contenedor(this.tableName, config);
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
    

    save(obj) {
       
      if (!obj) {
          return false;
      }
      return this.db.insert(obj);
    }

    getAll() {
        return this.db.selectAll();
    }
}

module.exports = ChatApi;