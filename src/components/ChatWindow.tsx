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
import { capitalizeString } from "../utils/misc";
import { handleDeleteMessage, handleNewMessage, handleUpdateMessage } from "../../server/sockets/chatSocket";

const ChatWindow = () => {
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const [userList, setUserList] = useState<UserProps[]>([]);
  const [isEditMessageVisible, setIsEditMessageVisible] = useState(false);
  const [isReplyMessageVisible, setIsReplyMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState<"edit" | "new"  | "reply">("new");
  const [focusedMessage, setFocusedMessage] = useState<MessageProps>(emptyMessage);
  const {user} = useContext(UserContext);
  const [userReceiver, setUserReceiver] = useState<UserProps|null>(null);
  const {conversation, conversationList, socket} = useSocket();
  const dummy = useRef<HTMLDivElement | null>(null);
  const textmessage = {
    ...emptyMessage,
    author: {
      ...user
    }
  }

  useEffect(() => {
    if (conversation) {
      setMessageList([...conversation.messages]);
      const currentConversation = conversationList.find((conv) => conversation["_id"] === conv["_id"]);
      const received = currentConversation?.participants[1];
      if(received) {
        setUserReceiver(received);
      }
    }
  }, [conversation, conversationList]);

  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      const users = await getAllUsers();
  
      if (users) {
        const partList = conversationList
          .map((conversation) => conversation.participants)
          .flat()
          .filter((participant) => participant.id !== user.id);
    
        const filteredUsers = users
          .filter((usuario: UserProps) => usuario.id !== user.id)
          .filter(
            (usuario: UserProps) =>
              !partList.some(
                (participant) => participant.id === usuario.id
              )
          );
        setUserList(filteredUsers);
      }
    };
  
    fetchAndFilterUsers();
  }, [user, conversationList]); 
  

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
      setFocusedMessage({...editMsg});
      setIsEditMessageVisible(true);
      setMessageType("edit");
    }
  };

  const handleShowReplyMessage = (messageId: string) => {
    const replyMsg = messageList.find((msg) => msg.id === messageId);
    if(replyMsg) {
      setFocusedMessage({...replyMsg, replyOfMessage: replyMsg.content});
      setIsReplyMessageVisible(true);
      setMessageType("reply");
    }
  };

  const handleSendMessage = (message: MessageProps, type: "new" | "edit" | "reply" ) => {
    if (type === "edit") {
      handleSaveEditedMessage(message);
    } else if(type === "new"){
      handleClickNewMessage(message);
    }else if(type === "reply"){
      handleClickReplyMessage(message);
    }
  };

  const handleClickNewMessage = (message: MessageProps | null) => {
    if(message){
      const msg = {
        ...message,
        author:{
          ...textmessage.author
        } 
      }
      setMessageList([
        ...messageList, 
        {...msg}
      ]);
      setFocusedMessage(textmessage);  
      handleNewMessage(
        {
          conversationId: conversation._id, 
          senderId:user.id, 
          message: {...msg}
        }, 
        socket);
    }
  };

  const handleClickDeleteMessage = (messageId: string) => {  
    setMessageList((prevList) =>
      prevList.filter((msg) => msg.id !== messageId)
    );
    handleDeleteMessage(messageId, socket);
    setMessageType("new");
  };

  const handleClickReplyMessage = (message: MessageProps) => {
    setMessageList([...messageList, message]);
    setIsReplyMessageVisible(false);
    setMessageType("new");
    handleNewMessage(
      {
        conversationId:conversation._id, 
        senderId:user.id, 
        message: {
          ...message,
          author:{
            ...textmessage.author
          } 
        }
      }, 
      socket);
  }

  const handleSaveEditedMessage = (message: MessageProps) => {
    const updatedList = messageList.map(msg => msg.id === message.id ? message : msg);
    setMessageList(updatedList as MessageProps[]);
    setIsEditMessageVisible(false);
    setMessageType("new");
    handleUpdateMessage(message, socket);
    setFocusedMessage(textmessage);
  };

  return (
    <div
      data-testid="chat-window"
      className="h-fit md:min-h-screen w-fit md:w-[900px] grid grid-cols-12 py-3 md:py-16 mx-auto"
    >
      <section className="col-span-12 md:col-span-9 bg-primary-40 sm:rounded-md md:rounded-none md:rounded-l-md">
        <div className=" text-primary-600">
          {conversation && userReceiver && <ChatHeader name={
            `${capitalizeString(userReceiver.name)} 
             ${capitalizeString(userReceiver.lastname)} 
            `} /> 
          }
        </div>
        <div className="h-[500px] bg-white rounded-md overflow-y-scroll">
              {messageList.length > 0 ?           
              <MessageList
                messageList={messageList}
                onDeleteMessage={handleClickDeleteMessage}
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
            setMessageType={setMessageType}
            message={focusedMessage as MessageProps}
          />
        )}
        {isReplyMessageVisible && (
          <MessageReply
            setIsVisible={setIsReplyMessageVisible}
            setFocusedMessage={setFocusedMessage}
            setMessageType={setMessageType}
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
        <ConversationList height={250} data={conversationList} />
        <UserList height={250} data={userList} />
      </section>
    </div>
  );
};

export default ChatWindow;
