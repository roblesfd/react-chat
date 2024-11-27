import {
  faTrashCan,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import { dropdownData } from "../utils/mockData";
import { capitalizeString, shortenString } from "../utils/misc";
import { ConversationProps } from "../types/ConversationProps";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { handleDeleteConversation } from "../../server/sockets/chatSocket";
import { useSocket } from "../hooks/useSocket";

export type ConversationItemProps = {
  data: ConversationProps;
  onClick?: (...args: unknown[]) => void;
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  onClick = () => {},
}) => {
  const { user } = useContext(UserContext);
  const { socket, conversationList, setConversationList } = useSocket();
  const participant = data.participants.filter(
    (participant) => participant.id !== user.id
  );
  const { messages } = data;
  const { name, lastname } = participant[0];
  const fullName = `${capitalizeString(name)} ${capitalizeString(lastname)}`;

  const optionList = [
    {
      title: "Eliminar conversación",
      onClick: () => {
        const fillteredConversationList = conversationList.filter(
          (conv) => conv._id !== data._id
        );
        setConversationList([...fillteredConversationList]);
        handleDeleteConversation(data._id, socket);
      },
      icon: faTrashCan as IconDefinition,
    },
  ];

  const dropdownInfo = {
    ...dropdownData,
    options: optionList.map((option) => (
      <div className="w-full">
        <button
          onClick={option.onClick}
          className="w-full flex items-center justify-end gap-3 hover:bg-slate-200 py-1 px-2"
        >
          <span>{option.title}</span>
          <FontAwesomeIcon icon={option.icon} className="text-md" />
        </button>
      </div>
    )),
  };

  return (
    <div
      data-testid="conversation-item"
      onClick={onClick}
      className="bg-primary-200 grid grid-cols-10 gap-3 max-h-18 rounded-md p-1 hover:cursor-pointer"
      title={`${fullName}`}
    >
      <div className="col-span-2 my-auto flex items-center justify-center  rounded-full h-11 w-11 p-2 ml-2 bg-secondary-200">
        <FontAwesomeIcon icon={faUser} className="w-full text-xl" />
      </div>
      <div className="col-span-6 block">
        <h5 className="text-[14px] mb-1 font-semibold">
          {shortenString(`${fullName}`, 11)}...
        </h5>
        <p className="text-[12px]">
          {messages.length > 0 &&
            shortenString(messages[messages.length - 1].content, 12)}
          ...
        </p>
      </div>
      <div className="col-span-2">
        <Dropdown {...dropdownInfo} />
      </div>
    </div>
  );
};

export default ConversationItem;
