import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dropdownMessageData } from "../utils/mockData";
import Dropdown from "./Dropdown";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MessageProps } from "../types/MessageProps";

type MessageItemProps = {
  message: MessageProps;
  onDeleteMessage: (id: number) => void;
  onEditMessage: (id: number) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onDeleteMessage,
  onEditMessage,
}) => {
  const { id, type, content, createdAt, isEdited } = message;

  const dropdownData = {
    ...dropdownMessageData,
    options: [
      <div className="w-full">
        <button
          onClick={() => onEditMessage(id)}
          className="w-full flex items-center justify-end gap-3 hover:bg-slate-200"
        >
          <span>Editar</span>
          <FontAwesomeIcon icon={faEdit} className="text-md" />
        </button>
      </div>,
      <div key="eliminar" className="w-full">
        <button
          onClick={() => onDeleteMessage(id)}
          className="w-full flex items-center justify-end gap-3 hover:bg-slate-200"
        >
          <span>Eliminar</span>
          <FontAwesomeIcon icon={faClose} className="text-md" />
        </button>
      </div>,
    ],
  };

  return (
    <div
      data-testid="message-item"
      id={`${id}`}
      className={`flex ${
        type === "sender" ? "flex-row-reverse" : ""
      } justify-start items-center`}
    >
      <div
        className={`w-11/12 md:w-3/4 md:max-w-[70%] min-h-20 max-h-auto py-2 px-4 ${
          type === "sender"
            ? "bg-tertiary-600 text-tertiary-50"
            : "bg-tertiary-100 text-tertiary-800"
        } rounded-lg`}
      >
        <div className="flex justify-between">
          <div className=" flex justify-start items-center gap-3">
            {/* fecha de envio */}
            <p className="text-xs">{createdAt}</p>
          </div>
          <div>{type === "sender" && <Dropdown {...dropdownData} />}</div>
        </div>
        {/* contenido de texto */}
        <div className="mt-2 text-[15px] text-">
          <p className="break-all">{content}</p>
        </div>
        {isEdited && (
          <div className="italic text-right">
            <span className="text-sm">Editado</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
