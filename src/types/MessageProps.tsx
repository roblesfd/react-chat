export type MessageProps = {
  id: string;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
  replyOfMessage: string;
  reactions: unknown[];
  isReply: boolean;
  isEdited: boolean;
};
