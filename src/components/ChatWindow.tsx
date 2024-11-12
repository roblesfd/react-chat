import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ConversationList from "./ConversationList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { emptyMessage, mensajes, mockMessageList } from "../utils/mockData";
import { formatDate, formatDateTime, formatTime } from "../utils/dateUtils";
import MessageEdit from "./MessageEdit";
import { MessageProps } from "../types/MessageProps";
import { generateFakeUser, itemListGenerator } from "../utils/mockGenerators";

const ChatWindow = () => {
  const [newMessage, setnewMessage] = useState("");
  const [messageList, setMessageList] =
    useState<MessageProps[]>(mockMessageList);
  const [isEditMessageVisible, setIsEditMessageVisible] = useState(false);
  const [editedMessage, setEditedMessage] =
    useState<MessageProps>(emptyMessage);

  const conversationListData = itemListGenerator(12, () =>
    generateFakeUser(mensajes)
  );

  const updateObjectInArray = (
    objectArray: MessageProps[],
    updatedObject: MessageProps
  ): MessageProps[] => {
    return objectArray.map((obj) =>
      obj.id === updatedObject.id ? updatedObject : obj
    );
  };

  const dummy = useRef<HTMLDivElement | null>(null);

  const handleNewMessage = (message: string) => {
    const fecha = new Date();
    const messageObj = {
      ...emptyMessage,
      content: message,
      createdAt: formatDateTime(formatDate(fecha), formatTime(fecha)),
    };

    setnewMessage(newMessage);
    setMessageList([...messageList, messageObj]);
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessageList((prevList) =>
      prevList.filter((msg) => msg.id !== messageId)
    );
  };

  const handleShowEditMessage = (messageId: number) => {
    const editMsg = messageList.find((msg) => msg.id === messageId);
    setEditedMessage(editMsg);
    setIsEditMessageVisible(true);
  };

  const handleSaveEditedMessage = (messageId: number) => {
    // setMessageList((prevList) => updateObjectInArray(prevList, messageId));
    // setEditedMessage(emptyMessage);
    // setIsEditMessageVisible(false);
  };

  const handleSendMessage = (input: string | number) => {
    if (typeof input === "string") {
      handleNewMessage(input);
    } else if (typeof input === "number") {
      handleSaveEditedMessage(input);
    }
  };

  useEffect(() => {
    // Se utiliza para poder mostrar el mensaje nuevo en la seccion de mensajes
    // haciendo scroll a su ubicacion
    if (dummy instanceof HTMLDivElement) {
      dummy.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  return (
    <div
      data-testid="chat-window"
      className="h-[600px] grid grid-cols-12 my-16"
    >
      <section className="col-span-12 md:col-span-9 bg-primary-40 sm:rounded-md md:rounded-none md:rounded-l-md">
        <div className=" text-primary-600">
          <ChatHeader name="Nombre del usuario" />
        </div>
        <div className="h-[500px] bg-white rounded-md overflow-y-scroll">
          <MessageList
            height={450}
            messageList={messageList}
            onDeleteMessage={handleDeleteMessage}
            onEditMessage={handleShowEditMessage}
          />
          <div ref={dummy} />
        </div>
        {isEditMessageVisible && (
          <MessageEdit
            setIsVisible={setIsEditMessageVisible}
            message={editedMessage}
          />
        )}
        <MessageInput
          handleSendMessage={handleSendMessage}
          inputTextDefault={editedMessage && ""}
        />
      </section>
      <section className="hidden md:block md:col-span-3 bg-primary-400 rounded-r-md p-2 md:p-3">
        <ConversationList height={600} data={conversationListData} />
      </section>
    </div>
  );
};

export default ChatWindow;
