/* eslint-disable global-require */
import express, { Request, Response } from 'express';
import timeout from 'connect-timeout';
import http from 'http';
import { Server } from 'socket.io';
import 'reflect-metadata';


import { Setup } from '../prisma/setup/setup';
import { app } from './app';

const port = process.env.PORT || 3333;


app.listen(port, () => {
  setTimeout(() => {
    console.log(`
==============================================================================
Server is running on port ${port}
Using environment ${process.env.ENVIRONMENT}
==============================================================================
`);
    // eslint-disable-next-line no-use-before-define
    setupSockets();
  }, 500);
});

function haltOnTimedout(req: Request | any, res: Response, next: any) {
  if (!req.timedout) next();
}

/**
 * Configurações do servidor socket.io
 */
function setupSockets() {
  const socket_app = express();
  const { env } = process;
  socket_app.set('host', env.SOCKET_HOST || 'localhost');
  socket_app.set('port', env.SOCKET_PORT || 8988);
  socket_app.use(express.urlencoded({ extended: true }));
  socket_app.use(timeout('30s'));
  socket_app.use(haltOnTimedout);

  const socket_server = new http.Server(socket_app);

  const io = new Server(socket_server, {
    cors: {
      origin: '*',
    },
  });

  let oldID: any;
  io.on('connect', (socket: any) => {
    const safeConnection = (newID: any) => {
      socket.leave(oldID);
      socket.join(newID, () => {
        oldID = newID;
      });
    };

    socket.on('global.data.load', (payload: any) => {
      socket.broadcast.emit('global.data.load', payload);
      socket.emit('global.data.load', payload);
    });

    socket.on('socket.on', (payload: any) => {
      socket.on(payload.id, payload.subscriber);
    });

    socket.on('global.socket.on', (payload: any) => {
      socket.on(payload.id, payload.subscriber);
    });
  });

  socket_server.listen(socket_app.get('port'), socket_app.get('host'), () => {
    console.log(
      `Servidor SocketIO iniciado em ${socket_app.get('host')}:${socket_app.get(
        'port'
      )}`
    );
  });
}

new Setup().setup();
