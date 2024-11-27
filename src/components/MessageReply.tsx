import { faClose, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shortenString } from "../utils/misc";
import { MessageProps } from "../types/MessageProps";
import { emptyMessage } from "../utils/mockData";

type MessageReplyProps = {
  setIsVisible: (visible: boolean) => void;
  setFocusedMessage: (message: MessageProps) => void;
  setMessageType: (type: "new") => void;
  message: MessageProps;
};

const MessageReply: React.FC<MessageReplyProps> = ({
  setIsVisible,
  setFocusedMessage,
  message,
  setMessageType,
}) => (
  <div
    data-testid="message-reply"
    className="flex justify-start items-center gap-3 text-primary-800 bg-primary-50 px-4 pb-2 pt-1"
  >
    <FontAwesomeIcon icon={faReply} />
    <div className="block flex-1">
      <h3>Responder a mensaje</h3>
      <p className="text-sm">{shortenString(message.content)}...</p>
    </div>
    <button
      className=""
      title="Cancelar respuesta"
      onClick={() => {
        setFocusedMessage(emptyMessage);
        setIsVisible(false);
        setMessageType("new");
      }}
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  </div>
);

export default MessageReply;
