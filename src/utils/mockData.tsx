import { faEllipsis, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageProps } from "../types/MessageProps";
import {v4 as uuid} from "uuid";

const dropdownData = {
  button: (
    <button className="w-full text-primary-30  hover:text-primary-600 dark:hover:text-primary-30 hover:bg-primary-100 dark:hover:bg-primary-200 px-2 py-1 rounded-md ">
      <FontAwesomeIcon icon={faEllipsis} />
    </button>
  ),
  options: [
    <div>
      <button className={`flex items-center justify-between gap-2`}>
        Silenciar
      </button>
      <FontAwesomeIcon icon={faVolumeMute} className="text-md" />
    </div>,
  ],
};



const dropdownMessageData = {
  button: (
    <button className="w-full text-primary-30  hover:text-primary-600 dark:hover:text-primary-30  px-2 py-1 rounded-md ">
      <FontAwesomeIcon icon={faEllipsis} />
    </button>
  ),
  options: [],
};

const mensajes = [
  "Hola, ¿cómo estás?",
  "¡Buenos días!",
  "¿Qué tal todo?",
  "¡Nos vemos pronto!",
  "¿Has terminado el proyecto?",
  "Me encanta este lugar",
  "Hasta luego",
];

const mockMessageList: MessageProps[] = [
  {
    id: uuid(),
    type: "recipient",
    content:
      "Este es el cuerpo del mensaje khhk  ksdhfk sdkjhsdkjshdfkjshdfkjhsfdkjshdfkjshdfkjshdfkjsdhfkjsdhfkjshdfkjshdfkjshdf dsfhjksdfhjksd fksjdfh ksjdfskdjf hskjdfh skdjf sdkjfhsd kfjhs fksdfhskjd fskdjfh sdfk sdkfjh skdfhsdfk",
    avatar: "",
    author: {
      username: "Nombre del autor",
    },
    createdAt: "27/03/2024 a las 17:58",
    replyOfMessage: "",
    reactions: [],
    isReply: false,
    messageToReply: "",
    isEdited: false,
  },
  {
    id: uuid(),
    type: "sender",
    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, rem?",
    avatar: "",
    author: {
      username: "Nombre del autor",
    },
    createdAt: "27/03/2024 a las 17:58",
    replyOfMessage: "",
    reactions: [] as unknown[],
    isReply: false,
    messageToReply: "",
    isEdited: true,
  },
];

const emptyMessage: MessageProps = {
  id:uuid(),
  type: "sender",
  content: "",
  avatar: "",
  author: {
    username: "",
  },
  createdAt: "",
  replyOfMessage: "",
  reactions: [],
  isReply: false,
  messageToReply: "",
  isEdited: false,
};

const dataMessage: MessageProps = {
  id: "100",
  type: "sender",
  content: "Cuerpo del mensaje",
  avatar: "",
  author: {
    username: "Juanson",
  },
  createdAt: "",
  replyOfMessage: "",
  reactions: [],
  isReply: false,
  messageToReply: "",
  isEdited: false,
};

export {
  dropdownData,
  mensajes,
  mockMessageList,
  dropdownMessageData,
  emptyMessage,
  dataMessage,
};
