import { Credentials } from '@/lib/greenapi/types';
import { ChatWithData, JSONValue } from '@/types';

const AUTH_KEY = 'auth';

const storeItem = (key: string, data: Record<string, JSONValue>) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    //noop
  }
};

const loadItem = (key: string) => {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
};

export const saveSession = (auth: Credentials) => {
  storeItem(AUTH_KEY, auth);
};

export const loadSession = () => {
  const auth = loadItem(AUTH_KEY) as Credentials | null;
  return {
    auth
  };
};

export const checkMessageExists = (chats: ChatWithData[], chatId: string, idMessage?: string): boolean => {
  if (!idMessage) return false;
  const chat = chats.find(el => el.telephone === chatId);
  if (!chat) return false;

  const found = chat.msgs.find(el => el.idMessage === idMessage);

  return !!found;
};

