
const socket = io.connect();

//function to add a message
function addMessage(e){

    const inputUsername = document.getElementById('inputUsername').value;
    const inputMensaje = document.getElementById('inputMensaje').value;
    const inputDate = getFormatDate(new Date());

    if(inputUsername === ''){ alert('Please Enter Username'); return false; }
    if(inputMensaje === ''){ document.getElementById('inputMensaje').focus(); return false; }

    const message = {
        username: inputUsername,
        text: inputMensaje,
        time: inputDate
    }
    socket.emit('mensaje', message);        

    document.getElementById('inputMensaje').value = ""; //Para vaciar el campo input de mensaje despues de emitir el mensaje
    document.getElementById('inputMensaje').focus();    //hacer focus en el campo input mensaje

    return false;
}

//funcion render mensajes
function renderMensajes(data){
    const html = data.map((elem, index) =>{
        return(`<div>
                <strong style="color:blue;">${elem.username}</strong>
                <span style="color:brown;"> [${elem.time}] </span>
                <em style="color:green;">: ${elem.text}</em>
                </div>`)
    }).join(' ');

    document.querySelector('p').innerHTML = html;
}

//function to add products
function addProductos(){

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const form = document.getElementById('formProductos');

    if(title === ''){ alert('Please Enter title'); return false; }
    if(price === ''){ alert('Please Enter price'); return false; }
    if(thumbnail === ''){ alert('Please Enter thumbnail'); return false; }
    
    const newProduct = { title, price, thumbnail }

    fetch('/productos', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
    .then((res) => { res.json()         
    })
    .then((res) => {
        form.reset()
        socket.emit('postProducto'); 
    })
    .catch((error) => console.error(error))
}

//function render productos
function renderProductos(data){

    fetch('views/datos.handlebars')
    .then((res) => res.text())
    .then((res) => {
      const template = Handlebars.compile(res)
      const html = template({ products: data, existProducts: data.length })      
      document.getElementById('datosProductos').innerHTML = html
    })
}

//Formato fecha
const getFormatDate = (date) => {
    const formatDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' +  date.getFullYear()
                + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    console.log(formatDate);
    return formatDate;
}

//pendiente de busqueda de mensajes
socket.on('mensajes', function(data) { renderMensajes(data) });  //socket on mensajes
socket.on('productos', function(data) { renderProductos(data) }) // socket on productos


