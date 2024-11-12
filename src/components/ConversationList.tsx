import ConversationItem from "./ConversationItem";

type ConversationListProps = {
  height: number;
  data: {
    fullName: string;
    messageShort: string;
  }[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  height,
  data,
}) => {
  return (
    <div data-testid="conversation-list">
      <h3 className="mb-4">Conversaciones</h3>
      <div className={`overflow-y-scroll h-[${height}px] space-y-3`}>
        {data.length ? (
          data.map((conversation, key) => (
            <ConversationItem key={key} data={conversation} />
          ))
        ) : (
          <span>No hay usuarios</span>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
