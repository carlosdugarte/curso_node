const express = require('express');
const rutaApi = require('./routers/app.routers');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const PORT = process.env.PORT || 8080;

//data
const { Chat } = require('./models/index');
const chat = new Chat();
const { Productos } = require('./models/index');
const productos = new Productos();

const regenChat = () => {
    const chats = chat.getAll();
    chats.then(data => {
        io.sockets.emit('regenerarChat', data);
    });
}

//publics static files
app.use(express.static(path.resolve(__dirname, 'public')));

io.on('connection', async socket => {
   
    console.log('Cliente conectado: ' + socket.id);
    regenChat();

    socket.on('incomingMessage', async (message) => {
        if(message.email){
            await chat.save(message);
            socket.emit('enviarMensaje', message);
            regenChat();
        }
    });

    socket.emit('regenerarProductos', await productos.getAll());    
});

//rutas
app.use('/api', rutaApi);

app.get('/', (req, res) => {
    res.sendfile(path.resolve(__dirname, './public/index.html'));
})



httpserver.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})