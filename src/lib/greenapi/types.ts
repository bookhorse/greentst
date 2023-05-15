export type Credentials = {
  waInstance: string;
  apiToken: string;
};

export type TextMessage = {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  archiveChat?: boolean;
  linkPreview?: boolean;
};

export type TextMessageResponse = {
  idMessage: string;
};

export type ReceiveNotificationResponse = {
  receiptId: number;
  body: NotificationBody;
};

export type DeleteNotificationResponse = {
  result: boolean;
};

export type InstanceData = {
  idInstance: number;
  wid: string;
  typeInstance: string;
};

export type SenderData = {
  chatId: string;
  sender: string;
  chatName: string;
  senderName: string;
}

export type QuotedMessage = {
  stanzaId: string;
  participant: string;
  typeMessage: string;
};

export interface IncomeMessage {
  typeMessage: string;
};

export type TextMessageData = IncomeMessage & {
  textMessageData: {
    textMessage: string;
    isTemplateMessage?: boolean;
  };
  quotedMessage?: QuotedMessage;
};


export type QuotedMessageData = IncomeMessage & {
  extendedTextMessageData: {
    text: string;
    stanzaId: string;
    participant: string;
  };
};

export type ReactionMessageData = IncomeMessage & {
  extendedTextMessageData: {
    text: string;
  };
  quotedMessage: QuotedMessage;
};

export type MessageData = TextMessageData | ReactionMessageData | QuotedMessageData;

export type NotificationBody = {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
};
