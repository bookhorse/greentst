import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket as IOSocket } from 'socket.io';
import type { Socket as NetSocket } from 'net';
import type { Server as HTTPServer } from 'http';
import { Credentials, ReceiveNotificationResponse, TextMessage } from '@/lib/greenapi/types';
import { sendTextMessage } from '@/lib/greenapi';
import NotificationPoller from '@/lib/greenapi/poller';

const POLL_INTERVAL = 5000;

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
};

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
};

export interface ClientToServerEvents {
  auth: (auth: Credentials) => void;
  message: (chatId: string, message: string) => void;
};

export interface ServerToClientEvents {
  notification: (data: ReceiveNotificationResponse) => void;
  error: (message: string) => void;
};

const makeChatId = (telephone: string) => {
  const numbers = telephone.replace('+', '');

  return `${numbers.trim()}@c.us`;
};

const messageHandler = (_io: IOServer, socket: IOSocket<ClientToServerEvents, ServerToClientEvents>) => {
  console.log(socket.id);
  const poller = new NotificationPoller(POLL_INTERVAL);
  let clientCredentials: Credentials | null = null;

  const makeError = (msg: string) => {
    socket.emit('error', msg);
    poller.stop();
  };

  socket.on('disconnect', () => {
    poller.stop();
  });

  socket.on('auth', (auth: Credentials) => {
    poller.stop();
    clientCredentials = auth;
    poller.start(clientCredentials, (data) => {
      socket.emit('notification', data);
    }, () => {
      makeError('wrong auth');
    });
  });

  socket.on('message', (chatId, message) => {
    if (clientCredentials) {
      const data: TextMessage = {
        chatId: makeChatId(chatId),
        message
      };
      try {
        sendTextMessage(clientCredentials, data);
      } catch {
        makeError('wrong auth');
      }
    } else {
      makeError('wrong auth');
    }
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
