import {
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

type MessageInputProps = {
  handleSendMessage: (input: string | number) => void;
  inputTextDefault: string;
};

const MessageInput: React.FC<MessageInputProps> = ({
  handleSendMessage,
  inputTextDefault,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputMessage, setInputMessage] = useState<string>(
    inputTextDefault ? inputTextDefault : ""
  );

  const onInputChange = (value: string) => {
    setInputMessage(value);
  };

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
        onChange={(e) => onInputChange(e.target.value)}
      />
      {/* Área de botones */}
      <div className="w-1/5 px-1 text-lg flex gap-2">
        <button
          title="Enviar mensaje"
          className={`${
            inputMessage
              ? "hover:bg-primary-30 text-primary-600 cursor-pointer dark:text-primary-30 dark:hover:bg-primary-200"
              : "text-primary-100 cursor-not-allowed"
          } rounded-full h-10 w-10`}
          onClick={() => {
            handleSendMessage(inputMessage);
            setInputMessage("");
            setShowEmojiPicker(false);
          }}
          disabled={!inputMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
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
