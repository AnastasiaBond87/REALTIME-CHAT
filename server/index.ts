import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import { Server as ServerIO } from 'socket.io';
import 'dotenv/config';
import { router } from './src/routes/index.js';
import ErrorMiddleware from './src/middlewares/ErrorMiddleware.js';

const PORT = process.env.PORT || 5000;
const corsOptions: CorsOptions = {
  credentials: true,
  origin: process.env.ORIGIN,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', router);
app.use(ErrorMiddleware.errorHandler);

const server = createServer(app);
const socketIO = new ServerIO(server);

socketIO.on('connection', () => {});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || '');

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
