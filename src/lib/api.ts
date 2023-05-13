import { JSONValue } from '@/types';
import {
  Credentials,
  TextMessage,
  TextMessageResponse,
  ReceiveNotificationResponse,
  DeleteNotificationResponse
} from '@/types/greenapi';
import HttpClient from './http';

const http = new HttpClient();

const URL_BASE = 'https://api.green-api.com';
const SEND_MESSAGE_METHOD = 'SendMessage';
const RECEIVE_NOTIFICATION_METHOD = 'ReceiveNotification';
const DELETE_NOTIFICATION = 'DeleteNotification';

const makeUrl = (auth: Credentials, method: string, param?: JSONValue) => {
  const url = `${URL_BASE}/waInstance${auth.waInstance}/${method}/${auth.apiToken}`;

  return param ? url + `/${param}`: url;
};

export const sendTextMessage = async (auth: Credentials, data: TextMessage): Promise<TextMessageResponse> => {
  const res = http.post(makeUrl(auth, SEND_MESSAGE_METHOD), data);
  return res;
};

export const receiveNotification = async (auth: Credentials): Promise<ReceiveNotificationResponse> => {
  const res = await http.get(makeUrl(auth, RECEIVE_NOTIFICATION_METHOD));
  return res;
};

export const deleteNotification = async (auth: Credentials, receiptId: number): Promise<DeleteNotificationResponse> => {
  const res = await http.get(makeUrl(auth, DELETE_NOTIFICATION, receiptId));
  return res;
};
