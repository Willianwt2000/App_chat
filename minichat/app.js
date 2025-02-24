const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Middleware para servir archivos estáticos
app.use(express.static(__dirname));

// Manejar conexiones de Socket.IO
io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado");

  // Escuchar mensajes del cliente
  socket.on('chat message', (msg) => {
    console.log(`Mensaje recibido: ${msg}`);

    // Reenviar el mensaje a todos los clientes (incluido el que lo envió)
    io.emit('chat message', {
      text: msg,
      sender: socket.id, // Enviar el ID del remitente
    });
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log("Un usuario se ha desconectado");
  });
});


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});