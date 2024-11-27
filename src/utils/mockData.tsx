import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageProps } from "../types/MessageProps";
import { v4 as uuid } from "uuid";

const dropdownData = {
  button: (
    <button className="w-full text-primary-30 px-2 py-1 rounded-md ">
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
    content:
      "Este es el cuerpo del mensaje khhk  ksdhfk sdkjhsdkjshdfkjshdfkjhsfdkjshdfkjshdfkjshdfkjsdhfkjsdhfkjshdfkjshdfkjshdf dsfhjksdfhjksd fksjdfh ksjdfskdjf hskjdfh skdjf sdkjfhsd kfjhs fksdfhskjd fskdjfh sdfk sdkfjh skdfhsdfk",
    author: {
      id: "",
      username: "",
      name: "",
      lastname: "",
      email: "",
      role: "",
      token: "",
      createdAt: "",
      updatedAt: "",
    },
    createdAt: "27/03/2024 a las 17:58",
    updatedAt: "27/03/2024 a las 18:58",
    replyOfMessage: "",
    isReply: false,
    isEdited: false,
  },
  {
    id: uuid(),

    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, rem?",
    author: {
      id: "",
      username: "",
      name: "",
      lastname: "",
      email: "",
      role: "",
      token: "",
      createdAt: "",
      updatedAt: "",
    },
    createdAt: "27/03/2024 a las 17:58",
    updatedAt: "27/03/2024 a las 18:58",
    replyOfMessage: "",
    isReply: false,
    isEdited: true,
  },
];

const emptyMessage: MessageProps = {
  id: uuid(),
  content: "",
  author: {
    id: "",
    username: "",
    name: "",
    lastname: "",
    email: "",
    role: "",
    token: "",
    createdAt: "",
    updatedAt: "",
  },
  createdAt: "",
  updatedAt: "",
  replyOfMessage: "",
  isReply: false,
  isEdited: false,
};

const dataMessage: MessageProps = {
  id: "100",
  content: "Cuerpo del mensaje",
  author: {
    id: "",
    username: "",
    name: "",
    lastname: "",
    email: "",
    role: "",
    token: "",
    createdAt: "",
    updatedAt: "",
  },
  createdAt: "",
  updatedAt: "",
  replyOfMessage: "",
  isReply: false,
  isEdited: false,
};

const decodedEmpty = {
  UserInfo: {
    username: "",
    role: "",
    id: "",
  },
};

export {
  dropdownData,
  mensajes,
  mockMessageList,
  emptyMessage,
  dataMessage,
  decodedEmpty,
};
