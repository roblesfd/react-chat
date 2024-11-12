import UserConnectionStatus from "./UserConnectionStatus";
import { getTimeElapsed } from "../utils/dateUtils";

type ChatHeaderProps = {
  name: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
  const fechaPasada = new Date("2024-11-05T15:27:00");
  const fechaActual = new Date();
  const timeElapsed = getTimeElapsed(fechaPasada, fechaActual);
  return (
    <div data-testid="chat-header" className="p-3">
      <div className="flex justify-start items-center gap-4">
        <h3 className="text-xl">{name}</h3>
        <UserConnectionStatus timeElapsed={timeElapsed} />
      </div>
    </div>
  );
};

export default ChatHeader;
