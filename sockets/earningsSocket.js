let io;

const userSockets = {};

function setupSocket(server) {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    userSockets[userId] = socket;

    socket.on('disconnect', () => {
      delete userSockets[userId];
    });
  });
}

function sendEarningUpdate(userId, data) {
  if (userSockets[userId]) {
    userSockets[userId].emit('earning-update', data);
  }
}

module.exports = { setupSocket, sendEarningUpdate };
