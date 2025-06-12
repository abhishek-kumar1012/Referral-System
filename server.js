const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { setupSocket } = require('./sockets/earningsSocket');

const server = http.createServer(app);
setupSocket(server);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  server.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
