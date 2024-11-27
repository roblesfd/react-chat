type ChatHeaderProps = {
  name: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
  return (
    <div data-testid="chat-header" className="p-3">
      <div className="flex justify-start items-center gap-4">
        <h3 className="text-xl">{name}</h3>
      </div>
    </div>
  );
};

export default ChatHeader;
