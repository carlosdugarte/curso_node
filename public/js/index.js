const socket = io.connect();

//function to add a message
function addMessage(e){

    const inputUsername = document.getElementById('inputUsername').value;
    const inputMensaje = document.getElementById('inputMensaje').value;
    const inputDate = new Date();

    if(inputUsername != ''){
    const message = {
        username: inputUsername,
        text: inputMensaje,
        time: inputDate
    }

    console.log(message);

    socket.emit('mensaje', message);
    }else{
        alert('Please Enter Username');
    }
    return false;
}

//funcion render view
function render(data){
    const html = data.map((elem, index) =>{
        return(`<div>
                <strong style="color:blue;">${elem.username}</strong>
                <span style="color:brown;"> [${elem.time}] </span>
                <em style="color:green;">: ${elem.text}</em>
                </div>`)
    }).join(' ');

    document.querySelector('p').innerHTML = html;
}

socket.on('mensajes', function(data) { render(data) });