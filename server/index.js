import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server as ServerIO } from 'socket.io';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const server = createServer(app);
const socketIO = new ServerIO(server);

socketIO.on('connection', () => {});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

