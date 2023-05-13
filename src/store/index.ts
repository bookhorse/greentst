import { Credentials } from '@/lib/greenapi/types';
import { create } from 'zustand';

interface GlobalStore {
  chats: string[];
  auth: Credentials | null;

  setAuth: (data: Credentials | null) => void;
  createChat: (number: string) => void;
};

export default create<GlobalStore>()((set, _get) => ({
  chats: [],
  auth: null,

  setAuth: (data) => {
    set({ auth: data });
  },
  createChat: async (number) => {
    set({ chats: [number] });
  }
}));
