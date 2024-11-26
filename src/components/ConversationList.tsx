import { useContext } from "react";
import { handleStartConversation } from "../../server/sockets/chatSocket";
import { ConversationProps } from "../types/ConversationProps";
import ConversationItem from "./ConversationItem";
import { useSocket } from "../hooks/useSocket";
import UserContext from "../context/UserContext";

type ConversationListProps = {
  height: number;
  data: ConversationProps[] | [];
};

const ConversationList: React.FC<ConversationListProps> = ({
  height,
  data,
}) => {
  const {user} = useContext(UserContext);
  const {socket} = useSocket();

  return (
    <div data-testid="conversation-list">
      <h3 className="mb-4">Conversaciones</h3>
      <div style={{height: `${height}px`}} className={`overflow-y-scroll space-y-3 text-center`}>
        {data.length ? (
          data.map((conversation, key) => (
            <ConversationItem 
              key={key} 
              data={conversation} 
              onClick={()=>handleStartConversation(user.id, conversation.participants[1].id, socket)} />
          ))
        ) : (
          <span>No hay conversaciones</span>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
