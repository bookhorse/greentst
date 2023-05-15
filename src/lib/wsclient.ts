import { ServerToClientEvents, ClientToServerEvents } from '@/pages/api/socket';
import { io, Socket } from 'socket.io-client';
import { Credentials, ReceiveNotificationResponse, NotificationBody } from './greenapi/types';

let ws = null as Socket<ServerToClientEvents, ClientToServerEvents> | null;
const callbacks = {
  notification: null as null | ((data: NotificationBody) => void)
};

export const initSocket = async () => {
  if (ws) return Promise.resolve(false);
  await fetch('/api/socket');
  return new Promise((resolve) => {
    const socket = io(location.host, { transports: ['websocket', 'polling']});

    socket.on('connect', () => {
      ws = socket;
      resolve(true);
    });

    socket.on('error', (message: string) => {
      alert(message);
    });

    socket.on('disconnect', () => {
      alert('Websocket disconnected!\nReload page to continue');
    });

    socket.on('notification', (data: ReceiveNotificationResponse) => {
      if (callbacks.notification) {
        callbacks.notification(data.body);
      }
    });
  });
};

export const sendMessage = (chatId: string, message: string) => {
  if (!ws) throw new Error('Socket not initialized');

  ws.emit('message', chatId, message);
};

export const authorize = (auth: Credentials) => {
  if (!ws) throw new Error('Socket not initialized');

  ws.emit('auth', auth);
};

type Callbacks = typeof callbacks;

export const attachCallback = <T extends keyof Callbacks>(key: T, cb: Callbacks[T]) => {
  callbacks[key] = cb;
};
