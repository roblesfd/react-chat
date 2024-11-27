import {
  faUser,
  faUserPlus,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import { dropdownData } from "../utils/mockData";
import { UserProps } from "../types/UserProps";
import { capitalizeString } from "../utils/misc";
import { useSocket } from "../hooks/useSocket";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { handleStartConversation } from "../../server/sockets/chatSocket";

export type UserItemProps = {
  data: UserProps;
};

const UserItem: React.FC<UserItemProps> = ({ data }) => {
  const { name, lastname } = data;
  const { socket } = useSocket();
  const { user } = useContext(UserContext);

  const optionList = [
    {
      title: "Iniciar conversación",
      onClick: () => {
        handleStartConversation(user.id, data.id, socket);
      },
      icon: faUserPlus as IconDefinition,
    },
  ];

  const dropdownInfo = {
    ...dropdownData,
    options: [
      ...optionList.map((option) => (
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
    ],
  };

  return (
    <div
      data-testid="conversation-item"
      className="bg-primary-200 grid grid-cols-10 gap-2 max-h-18 rounded-md p-1 hover:cursor-pointer"
    >
      <div className="col-span-2 my-auto flex items-center justify-center  rounded-full h-11 w-11 p-2 ml-2 bg-secondary-200">
        <FontAwesomeIcon icon={faUser} className="w-full text-xl" />
      </div>
      <div className="col-span-6 block">
        <h5 className="text-[14px] mb-1 font-semibold">{`${capitalizeString(
          name
        )} ${capitalizeString(lastname)}`}</h5>
        <p className="text-[12px]"></p>
      </div>
      <div className="col-span-2">
        <Dropdown {...dropdownInfo} />
      </div>
    </div>
  );
};

export default UserItem;
