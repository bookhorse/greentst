export type JSONValue = string | number | boolean;

export type ChatMsg = {
  timestamp: number;
  side: boolean;
  message: string;
  idMessage: string;
};

export type ChatDesc = {
  name: string;
  telephone: string;
};

export type ChatWithData = ChatDesc & {
  msgs: ChatMsg[];
}
