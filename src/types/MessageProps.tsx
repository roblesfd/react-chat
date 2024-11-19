export type MessageProps = {
  id: string;
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
  messageToReply: string;
  isEdited: boolean;
};
