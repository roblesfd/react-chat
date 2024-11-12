import { MessageProps } from "../types/MessageProps";
import MessageItem from "./MessageItem";

type MessageListProps = {
  height: number;
  messageList: MessageProps[];
  onDeleteMessage: (id: number) => void;
  onEditMessage: (id: number) => void;
};

const MessageList: React.FC<MessageListProps> = ({
  height = 100,
  messageList,
  onDeleteMessage,
  onEditMessage,
}) => {
  return (
    <div
      data-testid="message-list"
      className={`overflow-y-scroll h-[${height}px] space-y-1 md:space-y-3 px-3`}
    >
      {messageList.map((message, key) => (
        <MessageItem
          key={key}
          message={message}
          onDeleteMessage={onDeleteMessage}
          onEditMessage={onEditMessage}
        />
      ))}
    </div>
  );
};

export default MessageList;
