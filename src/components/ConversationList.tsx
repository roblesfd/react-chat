import { UserProps } from "../types/UserProps";
import ConversationItem from "./ConversationItem";

type ConversationListProps = {
  height: number;
  data: UserProps[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  height,
  data,
}) => {
  return (
    <div data-testid="conversation-list">
      <h3 className="mb-4">Conversaciones</h3>
      <div style={{height: `${height}px`}} className={`overflow-y-scroll space-y-3 text-center`}>
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
