import { Credentials } from '@/lib/greenapi/types';
import { ChatMsg, ChatWithData } from '@/types';
import { create } from 'zustand';
import { checkMessageExists, loadSession, saveSession } from './utils';
import { initSocket, sendMessage, authorize } from '@/lib/wsclient';
import { uuidv4 } from '@/utils';

export type CreateMessage = {
  chatId: string;
  message: string;
  timestamp?: number;
  side?: boolean;
  idMessage?: string;
};

export interface GlobalStore {
  chats: ChatWithData[];
  selectedChat: number;
  auth: Credentials | null;
  appLoaded: boolean;

  init: () => void;
  setAuth: (data: Credentials | null) => void;
  createChat: (name: string, telephone: string) => void;
  selectChat: (idx: number) => void;
  appendMessage: (msg: CreateMessage) => void;
  deleteAll: () => void;
};

const initialState = {
  chats: [],
  selectedChat: -1,
  auth: null,
  appLoaded: false
};

export default create<GlobalStore>()((set, get) => ({
  ...initialState,
  init: async () => {
    const { setAuth } = get();
    await initSocket();
    const session = loadSession();

    setAuth(session.auth);
    set({ appLoaded: true });
  },
  setAuth: (data) => {
    if (data) {
      saveSession(data);
      authorize(data);
    }
    set({ auth: data });
  },
  createChat: (name, telephone) => {
    const { chats, selectedChat } = get();
    const newChat = {
      name,
      telephone: telephone.replace('+', ''),
      msgs: []
    };
    set({
      chats: [newChat, ...chats],
      selectedChat: selectedChat === -1 ? 0 : selectedChat
    });
  },
  selectChat: (idx) => {
    const { chats } = get();
    if (idx >= chats.length) {
      throw new Error('Invalid chat index');
    }
    set({ selectedChat: idx });
  },
  appendMessage: async (msg: CreateMessage) => {
    const { chats, auth } = get();
    const { message, timestamp, side, chatId, idMessage } = msg;

    if (checkMessageExists(chats, chatId, idMessage)) return;

    const newMsg: ChatMsg = {
      message: message,
      timestamp: timestamp || Date.now(),
      side: !!side,
      idMessage: idMessage || uuidv4()
    };

    if (auth && side) {
      await sendMessage(chatId, message);
    } else if (!auth) {
      alert('not authorized');
    }

    set({ chats: chats.map(el => el.telephone === chatId
      ? { ...el, msgs: [...el.msgs, newMsg] }
      : el
    ) });
  },
  deleteAll: () => {
    set({ ...initialState, appLoaded: true });
  }
}));
