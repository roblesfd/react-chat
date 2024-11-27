import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dropdownData } from "../utils/mockData";
import Dropdown from "./Dropdown";
import {
  faClose,
  faEdit,
  faReply,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { MessageProps } from "../types/MessageProps";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

type MessageItemProps = {
  message: MessageProps;
  onDeleteMessage: (id: string) => void;
  onEditMessage: (id: string) => void;
  onReplyMessage: (id: string) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onDeleteMessage,
  onEditMessage,
  onReplyMessage,
}) => {
  const { user } = useContext(UserContext);
  const { id, content, createdAt, isEdited, isReply, replyOfMessage, author } =
    message;

  const optionList = [
    {
      key: "editar",
      title: "Editar",
      onClick: () => onEditMessage(id),
      icon: faEdit as IconDefinition,
    },
    {
      key: "eliminar",
      title: "Eliminar",
      onClick: () => onDeleteMessage(id),
      icon: faClose as IconDefinition,
    },
    {
      key: "responder",
      title: "Responder",
      onClick: () => onReplyMessage(id),
      icon: faReply as IconDefinition,
    },
  ];

  const dropdownInfo = {
    ...dropdownData,
    options: [
      ...optionList.map((option) => (
        <div key={option.key} className="w-full">
          <button
            onClick={option.onClick}
            className="w-full flex items-center justify-end gap-3 hover:bg-slate-200 px-2 py-1"
          >
            <span>{option.title}</span>
            <FontAwesomeIcon icon={option.icon} className="text-md" />
          </button>
        </div>
      )),
    ],
  };

  return (
    <div
      data-testid="message-item"
      id={`${id}`}
      className={`flex ${
        user.id === author._id ? "flex-row-reverse" : ""
      } justify-start items-center`}
    >
      <div
        className={`w-11/12 md:w-3/4 md:max-w-[70%] min-h-20 max-h-auto py-2 px-4 ${
          user.id === author._id
            ? "bg-tertiary-600 text-tertiary-50"
            : "bg-tertiary-100 text-tertiary-800"
        } rounded-lg`}
      >
        <div className="flex justify-between">
          <div className=" flex justify-start items-center gap-3">
            {/* fecha de envio */}
            <p className="text-xs">{createdAt}</p>
          </div>
          <div>{user.id === author._id && <Dropdown {...dropdownInfo} />}</div>
        </div>
        {/* contenido de texto */}
        <div className="mt-2 text-[15px] text-">
          {/* contenido si es una respuesta */}
          {isReply ? (
            <div
              className={`rounded-md ${
                user.id === author._id ? "bg-tertiary-500" : "bg-tertiary-300"
              }  py-6 px-4 text-sm mb-3`}
            >
              <Link to="#">
                <p className="italic">{replyOfMessage}</p>
              </Link>
            </div>
          ) : null}
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
