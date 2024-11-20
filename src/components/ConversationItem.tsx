import {faUser, faVolumeMute, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import { dropdownData } from "../utils/mockData";
import { UserProps } from "../types/UserProps";
import { capitalizeString } from "../utils/misc";

export type ConversationItemProps = {
  data: UserProps;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const optionList = [
  {
    title: "Silenciar",
    onClick: () => console.log("Silenciar"),
    icon: faVolumeMute as IconDefinition
  },
]

const dropdownInfo = {
  ...dropdownData,
  options: optionList.map(option => (
      <div className="w-full">
        <button
          onClick={option.onClick}
          className="w-full flex items-center justify-end gap-3 hover:bg-slate-200 py-1 px-2"
        >
          <span>{option.title}</span>
          <FontAwesomeIcon icon={option.icon} className="text-md" />
        </button>
      </div>
  ))
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  onClick = () => {},
}) => {
  const { name, lastname } = data;

  return (
    <div
      data-testid="conversation-item"
      onClick={(e) => onClick(e)}
      className="bg-primary-200 grid grid-cols-10 gap-3 max-h-18 rounded-md p-1 hover:cursor-pointer"
    >
      <div className="col-span-2 my-auto flex items-center justify-center  rounded-full h-11 w-11 p-2 ml-2 bg-secondary-200">
        <FontAwesomeIcon icon={faUser} className="w-full text-xl" />
      </div>
      <div className="col-span-6 block">
        <h5 className="text-[14px] mb-1 font-semibold">{`${capitalizeString(name)} ${capitalizeString(lastname)}`}</h5>
        <p className="text-[12px]">Mensaje...</p>
      </div>
      <div className="col-span-2">
        <Dropdown {...dropdownInfo} />
      </div>
    </div>
  );
};

export default ConversationItem;