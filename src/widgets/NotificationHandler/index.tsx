import { attachCallback } from '@/lib/wsclient';
import { useEffect } from 'react';
import useStore from '@/store';
import { MessageData, NotificationBody, QuotedMessageData, TextMessageData } from '@/lib/greenapi/types';

const getPhone = (chatId: string) => {
  const pos = chatId.indexOf('@');

  return pos === -1 ? chatId : chatId.substr(0, pos);
};

const getMsg = (data: MessageData) => {
  if (data.typeMessage === 'textMessage') {
    return (data as TextMessageData).textMessageData.textMessage;
  } else if (data.typeMessage === 'quotedMessage') {
    return (data as QuotedMessageData).extendedTextMessageData.text;
  } else {
    return null;
  }
};

const processNotification = (data: NotificationBody) => {
  const { typeWebhook, timestamp, senderData, messageData, idMessage } = data;
  if (typeWebhook !== 'incomingMessageReceived') return null;
  const message = getMsg(messageData);
  if (message === null) return null;

  return {
    timestamp,
    chatName: senderData.chatName,
    chatId: getPhone(senderData.chatId),
    message,
    idMessage
  };
};

const NotificationHandler = () => {
  const [chats, appendMessage, createChat] = useStore(store => [store.chats, store.appendMessage, store.createChat]);

  useEffect(() => {
    attachCallback('notification',  (notification) => {
      console.log(notification);
      const data = processNotification(notification);
      console.log(data);
      if (data) {
        const { chatId, message, timestamp, chatName, idMessage } = data;
        const isChatExists = !!chats.find(el => el.telephone === chatId);

        if (!isChatExists) {
          createChat(chatName, chatId);
        }

        const newMsg = {
          chatId,
          message,
          timestamp,
          side: false,
          idMessage
        };
        appendMessage(newMsg);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  return null;
};

export default NotificationHandler;
