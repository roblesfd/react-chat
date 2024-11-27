import {
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { MessageProps } from "../types/MessageProps";
import { v4 as uuid } from "uuid";
import { emptyMessage } from "../utils/mockData";

type MessageInputProps = {
  handleSendMessage: (message: MessageProps,  type: "new" | "edit" | "reply" ) => void;
  messageType: "new" | "edit" | "reply";
  message: MessageProps;
};

const MessageInput: React.FC<MessageInputProps> = ({
  handleSendMessage,
  messageType,
  message
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  
  useEffect(() => {
    setInputMessage(message ? message.content : "")
  }, [message]);

  const handleClick = () => {
    const curDate = new Date();
    let finalMessage: MessageProps = {...message};

    switch(messageType) {
      case "new":
        finalMessage = {
          ...finalMessage,
          id: uuid(),
          content: inputMessage, 
          createdAt: curDate.toString(),
        };
        break;
      case "edit":
        finalMessage = {
          ...finalMessage, 
          content: inputMessage, 
          isEdited: true
        }
        break;
      case "reply":
        finalMessage = {
          ...emptyMessage,
          author: finalMessage.author,
          replyOfMessage: finalMessage.replyOfMessage,
          id: uuid(),
          content: inputMessage,
          createdAt: curDate.toString() ,
          isReply: true,
        };  
        break;
      default:
        break;
    }

    handleSendMessage(
      finalMessage,
      messageType
    );
    setInputMessage("");
    setShowEmojiPicker(false);
  }

  return (
    <div
      data-testid="message-input"
      className="flex py-2 px-2 md:p-4 border border-gray-300"
    >
      {/* Área de input */}
      <input
        id="enviar-mensaje"
        type="text"
        className="w-4/5 px-1 md:px-4 py-2 focus:outline-none text-primary-600 placeholder:text-primary-500 dark:placeholder:text-primary-30 dark:text-primary-30 bg-tertiary-50 rounded-md"
        placeholder="Escribe un mensaje..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      {/* Área de botones */}
      <div className="w-1/5 px-1 text-lg flex gap-2">
        <button
          title="Enviar mensaje"
          className={`${
            inputMessage
              ? 
              "hover:bg-primary-100 hover:text-primary-40 text-primary-600 cursor-pointer"
              : "text-primary-100 cursor-not-allowed"
            }
            ${ messageType === "new" ?  "rounded-full h-10 w-10" : "rounded-md bg-primary-200 text-white px-2"}
            `}
          onClick={handleClick}
          disabled={!inputMessage}
        >
          {messageType === "reply" || messageType === "edit" ? <p className="text-sm">Guardar</p>  : <FontAwesomeIcon icon={faPaperPlane} />}
        </button>
        <button
          title="Subir archivo"
          className="hover:bg-primary-30 text-primary-600 dark:text-primary-30 dark:hover:bg-primary-200 rounded-full h-10 w-10"
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        <div className="relative">
          <button
            title="Enviar emoji"
            className="hover:bg-primary-30 text-primary-600 dark:text-primary-30 dark:hover:bg-primary-200 rounded-full h-10 w-10"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
             <FontAwesomeIcon icon={faFaceSmile} />
          </button>
          {showEmojiPicker && (
            <div
              data-testid="emoji-picker"
              className="absolute bottom-8 right-6"
            >
              <EmojiPicker
                searchPlaceholder="Buscar emojis..."
                onEmojiClick={(emoji) => {
                  setInputMessage((prev) => prev + emoji.emoji);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
