import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shortenString } from "../utils/misc";
import { MessageProps } from "../types/MessageProps";
import { emptyMessage } from "../utils/mockData";

type MessageEditProps = {
  setIsVisible: (visible: boolean) => void;
  setFocusedMessage: (message: MessageProps) => void;
  setMessageType: (type: "new") => void;
  message: MessageProps;
};

const MessageEdit: React.FC<MessageEditProps> = ({
  setIsVisible,
  setFocusedMessage,
  setMessageType,
  message,
}) => (
  <div
    data-testid="message-edit"
    className="flex justify-start items-center gap-3 text-primary-800 bg-primary-50 px-4 pb-2 pt-1"
  >
    <FontAwesomeIcon icon={faEdit} />
    <div className="block flex-1">
      <h3>Editar mensaje</h3>
      <p className="text-sm">{shortenString(message.content)}...</p>
    </div>
    <button
      title="Cancelar edición"
      onClick={() => {
        setIsVisible(false);
        setFocusedMessage(emptyMessage);
        setMessageType("new");
      }}
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  </div>
);

export default MessageEdit;
