import { deleteNotification, receiveNotification } from '.';
import { Credentials, ReceiveNotificationResponse } from './types';

type CbFunk = (notification: ReceiveNotificationResponse) => void;

interface Poller {
  start: (auth: Credentials, cb: CbFunk, onError?: () => void) => void;
  stop: () => void;
};

class NotificationPoller implements Poller {
  auth: Credentials | null = null;
  intervalId: NodeJS.Timer | null = null;
  pollInterval = 0;
  callback: CbFunk | null = null;
  onError?: () => void;

  constructor(pollInterval: number) {
    this.pollInterval = pollInterval;
  }

  async doPoll() {
    if (!this.auth) return;
    try {
      const data = await receiveNotification(this.auth);

      if (data) {
        deleteNotification(this.auth, data.receiptId);
        if (this.callback) {
          this.callback(data);
        }
      }
    } catch {
      if (this.onError) {
        this.onError();
      } else {
        console.log('poller stopped due to net error');
        this.stop();
      }
    }
  }

  start(authData: Credentials, cb: CbFunk, onError?: () => void) {
    this.auth = authData;
    this.callback = cb;
    this.onError = onError;
    this.intervalId = setInterval(() => this.doPoll(), this.pollInterval);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};


export default NotificationPoller;
