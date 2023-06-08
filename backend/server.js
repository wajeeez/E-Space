const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const cors = require('cors');

app.use(cors());



io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    socket.to(room).emit('userJoined', socket.id);
  });

  socket.on('offer', (data) => {
    socket.to(data.room).emit('offer', data.offer, socket.id);
  });

  socket.on('answer', (data) => {
    socket.to(data.room).emit('answer', data.answer, socket.id);
  });

  socket.on('candidate', (data) => {
    socket.to(data.room).emit('candidate', data.candidate, socket.id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    socket.broadcast.emit('userLeft', socket.id);
  });
});

const port = 5001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
