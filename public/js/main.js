const socket = io("ws://localhost:8080");

socket.on('enviarMensaje', (message) => {
    let html =  `
    <li class="list-group-item">
        <div class="row">
        <div class="col-md-12">
            <span
            class="text-primary fw-bold"
            style="font-size: small;"
            >${message.email}</span>
            <span style="color:#804000; font-size:small">[${message.date}]</span>
            <span class="text-success fst-italic"> : ${message.message}</span>
        </div>
        </div>
    </li>`;
    document.getElementById('listaMensajes').innerHTML += html;
});

socket.on('regenerarProductos', (productos) => {
    
    fetch('http://localhost:8080/template/tableProducts.tpl')
    .then(res => res.text())
    .then(data => {
        let template = Handlebars.compile(data);
        let html = template({productos});
        document.getElementById('tablaProductos').innerHTML = html;
    })
    .catch(err => console.log(err));
    //Cree este emit para poder regenerar la tabla de productos desde otro navegador
    
});

socket.on('regenerarChat', (chat) => {

    fetch('http://localhost:8080/template/listMessages.tpl')
    .then(res => res.text())
    .then(data => {
        let template = Handlebars.compile(data);
        let html = template({chat});
        document.getElementById('listaMensajes').innerHTML = html;
    })
    .catch(err => console.log(err));
    
});




document.getElementById('btnEnviarMensaje').addEventListener('click', (e) => {
    e.preventDefault();
    
    const mensaje = document.getElementById('inpMensaje').value;
    const email = document.getElementById('inpEmail').value;
    const date = getFormatDate();
    const data = {
        email,
        message: mensaje,
        date 
    };
    socket.emit('incomingMessage', data);
    document.getElementById('inpMensaje').value = '';
    document.getElementById('inpMensaje').focus();
    
});

const getFormatDate = () => {
    const dateFull = new Date();
    const date = dateFull.getDate() + '-' + (dateFull.getMonth() + 1) + '-' +  dateFull.getFullYear()
                + ' ' + dateFull.getHours() + ':' + dateFull.getMinutes() + ':' + dateFull.getSeconds();
    console.log(date);
    return date;
}

