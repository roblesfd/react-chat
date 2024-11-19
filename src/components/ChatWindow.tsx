import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ConversationList from "./ConversationList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { emptyMessage, mensajes } from "../utils/mockData";
import MessageEdit from "./MessageEdit";
import { MessageProps } from "../types/MessageProps";
import { generateFakeUser, itemListGenerator } from "../utils/mockGenerators";
import MessageReply from "./MessageReply";

const ChatWindow = () => {
  const [focusedMessage, setFocusedMessage] = useState<MessageProps>(emptyMessage);
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const [isEditMessageVisible, setIsEditMessageVisible] = useState(false);
  const [isReplyMessageVisible, setIsReplyMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState<"edit" | "new"  | "reply">("new");

  const conversationListData = itemListGenerator(12, () =>
    generateFakeUser(mensajes)
  );

  const dummy = useRef<HTMLDivElement | null>(null);

  const handleShowEditMessage = (messageId: string) => {
    const editMsg = messageList.find((msg) => msg.id === messageId);
    if(editMsg) {
      setFocusedMessage(editMsg);
      setIsEditMessageVisible(true);
      setMessageType("edit");
    }
  };

  const handleShowReplyMessage = (messageId: string) => {
    const replyMsg = messageList.find((msg) => msg.id === messageId);
    if(replyMsg) {
      setFocusedMessage({...replyMsg, messageToReply: replyMsg.content});
      setIsReplyMessageVisible(true);
      setMessageType("reply");
    }
  };

  const handleSendMessage = (message: MessageProps, type: "new" | "edit" | "reply" ) => {
    if (type === "edit") {
      handleSaveEditedMessage(message);
    } else if(type === "new"){
      handleSaveNewMessage(message);
    }else{
      handleSaveRepliedMessage(message);
    }
  };

  const handleSaveNewMessage = (message: MessageProps | null) => {
    if(message){
      setMessageList([...messageList, message]);
      setFocusedMessage(emptyMessage);
    }
  };

  const handleDeleteMessage = (messageId: string) => {  
    setMessageList((prevList) =>
      prevList.filter((msg) => msg.id !== messageId)
    );
    setMessageType("new");
  };

  const handleSaveEditedMessage = (message: MessageProps) => {
    const updatedList = messageList.map(msg => msg.id === message.id ? message : msg);
    setMessageList(updatedList as MessageProps[]);
    setFocusedMessage(emptyMessage);
    setIsEditMessageVisible(false);
    setMessageType("new");
  };

  const handleSaveRepliedMessage = (message: MessageProps) => {
    setMessageList([...messageList, message]);
    setFocusedMessage(emptyMessage);
    setIsReplyMessageVisible(false);
    setMessageType("new");
  }

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
              {messageList.length > 0 ?           
              <MessageList
                height={450}
                messageList={messageList}
                onDeleteMessage={handleDeleteMessage}
                onEditMessage={handleShowEditMessage}
                onReplyMessage={handleShowReplyMessage}
              />
              :
              <div className="h-full flex flex-col justify-center items-center">
                <p className="text-primary-800 text-center mt-6">Envía un mensaje...</p>
              </div>
              }
          <div ref={dummy} />
        </div>
        {isEditMessageVisible && (
          <MessageEdit
            setIsVisible={setIsEditMessageVisible}
            setFocusedMessage={setFocusedMessage}
            message={focusedMessage as MessageProps}
          />
        )}
        {isReplyMessageVisible && (
          <MessageReply
            setIsVisible={setIsReplyMessageVisible}
            setFocusedMessage={setFocusedMessage}
            message={focusedMessage as MessageProps}
          />
        )}
        <MessageInput
          handleSendMessage={handleSendMessage}
          messageType={messageType}
          message={focusedMessage}
        />
      </section>
      <section className="hidden md:block md:col-span-3 bg-primary-400 rounded-r-md p-2 md:p-3">
        <ConversationList height={600} data={conversationListData} />
      </section>
    </div>
  );
};

export default ChatWindow;
