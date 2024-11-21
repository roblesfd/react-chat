import { useContext, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ConversationList from "./ConversationList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { emptyMessage } from "../utils/mockData";
import MessageEdit from "./MessageEdit";
import MessageReply from "./MessageReply";
import { getAllUsers } from "../api/apiUsers";
import { UserProps } from "../types/UserProps";
import UserList from "./UserList";
import UserContext from "../context/UserContext";
import { MessageProps } from "../types/MessageProps";
import { useSocket } from "../hooks/useSocket";

const ChatWindow = () => {
  const [focusedMessage, setFocusedMessage] = useState<MessageProps>(emptyMessage);
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const [userList, setUserList] = useState<UserProps[]>([]);
  const [isEditMessageVisible, setIsEditMessageVisible] = useState(false);
  const [isReplyMessageVisible, setIsReplyMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState<"edit" | "new"  | "reply">("new");
  const {user} = useContext(UserContext);
  const {conversation, socket} = useSocket();
  const dummy = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (conversation) {
      setMessageList([...conversation.messages])
    }
  }, [conversation]);

  useEffect(() => {
    const fecthUsers = async () => {
      const users = await getAllUsers();
      if(users) {
        setUserList(users.filter((usuario) => usuario["_id"] !== user.id));
      }
    }
    fecthUsers();
  },[user]);

  useEffect(() => {
    // Se utiliza para poder mostrar el mensaje nuevo en la seccion de mensajes
    // haciendo scroll a su ubicacion
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);


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
      if(socket && conversation) {
        socket.emit("sendMessage", {
          conversationId: conversation["_id"], 
          senderId: user.id, 
          content: message.content,
        });
      }
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

  return (
    <div
      data-testid="chat-window"
      className="h-fit md:min-h-screen w-fit md:w-[900px] grid grid-cols-12 py-3 md:py-16 mx-auto"
    >
      <section className="col-span-12 md:col-span-9 bg-primary-40 sm:rounded-md md:rounded-none md:rounded-l-md">
        <div className=" text-primary-600">
          <ChatHeader name="Nombre del usuario" />
        </div>
        <div className="h-[500px] bg-white rounded-md overflow-y-scroll">
              {messageList.length > 0 ?           
              <MessageList
                messageList={messageList}
                onDeleteMessage={handleDeleteMessage}
                onEditMessage={handleShowEditMessage}
                onReplyMessage={handleShowReplyMessage}
              />
              :
              <div className="h-full flex flex-col justify-center items-center">
                <p className="text-primary-800 text-center mt-6">Selecciona una conversación...</p>
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
        {conversation && (
          <MessageInput
            handleSendMessage={handleSendMessage}
            messageType={messageType}
            message={focusedMessage}
          /> 
        )}
      </section>
      <section className="hidden md:block md:col-span-3 bg-primary-400 rounded-r-md p-2 md:p-3 divide-y space-y-10">
        <ConversationList height={250} data={userList} />
        <UserList height={250} data={userList} />
      </section>
    </div>
  );
};

export default ChatWindow;
