import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket as IOSocket } from 'socket.io';
import type { Socket as NetSocket } from 'net';
import type { Server as HTTPServer } from 'http';
import { ReceiveNotificationResponse } from '@/lib/greenapi/types';

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
};

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
};

interface ClientToServerEvents {
  message: (msg: string) => void;
};

interface ServerToClientEvents {
  notification: (data: ReceiveNotificationResponse) => void;
};


const messageHandler = (_io: IOServer, socket: IOSocket<ClientToServerEvents, ServerToClientEvents>) => {
  socket.on('disconnect', () => {
    console.log('disconnected!');
  });

  socket.on('message', (msg: string) => {
    console.log(msg);
    //socket.emit('notification', 'test');
  });
};

const SocketHandler = (
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new IOServer<ClientToServerEvents, ServerToClientEvents>(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => messageHandler(io, socket));
  }
  res.end();
};

export default SocketHandler;
