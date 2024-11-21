import { MessageProps } from "./MessageProps";
import { UserProps } from "./UserProps";


export type ConversationProps = {
    "_id" : string;
    participants: UserProps[];
    lastMessageId: string;
    messages: MessageProps[];
    createdAt: string;
    updatedAt: string;
}