export type JSONValue = string | number | boolean;

export type ChatMsg = {
  timestamp: number;
  side: boolean;
  message: string;
};

export type ChatDesc = {
  name: string;
  number: string;
};
