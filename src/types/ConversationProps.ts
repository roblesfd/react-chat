import { MessageProps } from "./MessageProps";
import { UserProps } from "./UserProps";


export type ConversationProps = {
    id: string;
    participants: UserProps[];
    messages: MessageProps[];
    createdAt: string;
    updatedAt: string;
}