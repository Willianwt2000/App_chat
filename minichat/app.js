const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Middleware para servir archivos estáticos
app.use(express.static(__dirname));

io.on("connection", (socket) => {

  socket.on('chat message', (msg) => {
    console.log(`Mensaje: ${msg}`)

    io.emit('chat message',msg)
  })
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
