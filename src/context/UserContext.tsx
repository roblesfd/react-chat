
import { createContext } from "react";

export type UserState = {
    id: string
    createdAt: string
    email: string
    friends: []
    lastname: string
    name: string
    role: string
    token: string
    username: string
};

type UserContextType = {
  user: UserState;
  setUser: (user: UserState) => void;
};

const   UserContext = createContext<UserContextType>({
  user: {
    id: "",
    createdAt: "",
    email: "",
    friends: [],
    lastname: "",
    name: "",
    role: "",
    token: "",
    username: "",
  },
  setUser: () => {},
});

export default  UserContext;



