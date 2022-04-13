
//Clase usuario
class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = [],
        this.mascotas = []        
    }   

    //Obtener apellido completo
    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }

    //Agregar mascota
    addMascota(mascota){
        this.mascotas.push(mascota);
    }   

    //contar mascotas
    countMascotas(){
        return this.mascotas.length;
    }

    //añadir libro
    addBook(nombre, autor){
        const libro =   {   
                            nombre : nombre, 
                            autor: autor
                        }
        this.libros.push(libro); 
    }

    //Obtener nombres de libros
    getBookNames(){
        const arrayNombreLibros = [];

        for(let i=0; i < this.libros.length ; i++){
            arrayNombreLibros.push(this.libros[i].nombre);
        }

        return arrayNombreLibros;
    }

}

//creación de objeto
const usuario = new Usuario('Carlos','Dugarte');

//ejecución de los métodos
//Obtener nombre completo
console.log(usuario.getFullName());

//agregar mascota
usuario.addMascota('Perro');
usuario.addMascota('Gato');
console.log(usuario.mascotas);

//Contar mascotas
console.log(usuario.countMascotas());

//Agregar libros
usuario.addBook('Harry Potter', 'JK Rowling');
usuario.addBook('El señor de los anillos', 'J. R. R. Tolkien');
usuario.addBook('El principito', 'Antoine de Saint-Exupéry');
usuario.addBook('100 años de soledad', 'Gabriel García Marquez');

//Obtener libros
console.log(usuario.getBookNames());

//Objeto usuario
console.log(usuario)


