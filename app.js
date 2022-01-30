import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import jRouter from './router/jweets';
import authRouter from './router/auth';
import config from './config'
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/jweets', jRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

const server = app.listen(config.host.port);
const socketIO = new Server(server, {
  // option key values
  cors: {
    origin: '*'
  }
})

socketIO.on('connection', (socket) => {
  console.log('Clinet connected')
  socketIO.emit('jwitter', 'Hello Name :) ')
})

// IN Client
// const socketIO = socket(API_URL)
// socketIO.on('connect_error', (err) => {
  // console.log('socket error occured', err)
// })
// import.on('jwitter', (msg) => console.log)