export type MessageProps = {
  id: number;
  type: "recipient" | "sender";
  content: string;
  avatar: string;
  author: {
    username: string;
  };
  createdAt: string;
  replyOfMessage: string;
  reactions: unknown[];
  isReply: boolean;
  messageToReply: number;
  isEdited: boolean;
};
