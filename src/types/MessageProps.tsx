import { UserProps } from "./UserProps";

export type MessageProps = {
  id: string;
  content: string;
  author: UserProps;
  createdAt: string;
  updatedAt: string;
  replyOfMessage: string;
  isReply: boolean;
  isEdited: boolean;
};
