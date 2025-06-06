export interface Chat {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: string;
}
export type ChatMessage = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
};
