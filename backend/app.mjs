import Express from 'express';
import socketIo from 'socket.io';
import http from 'http';

import { sendInstruction, sendToArduino } from './arduino/index.mjs';

const port = process.env.PORT || 4001;
const app = Express();

app.get('/', (req, res) => {
  console.log('conected');
  res.send({ response: 'response' }).status(200);
});

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', socket => {
  console.log('New client connected');
  setInterval(() => sendInstruction(socket), 10000); // Sen instruction every 10s
  socket.on('cmd', data => sendToArduino(data)); // <- WE retrive command
  socket.on('disconnect', () => console.log('Client disconnected')); // Wen client disconnect
});

server.listen(port, () => console.log(`Listening on port ${port}`));
