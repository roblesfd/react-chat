import { createContext } from "react";
import { UserProps } from "../types/UserProps";

type UserContextType = {
  user: UserProps;
  setUser: (user: UserProps) => void;
};

const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    createdAt: "",
    updatedAt: "",
    email: "",
    lastname: "",
    name: "",
    role: "",
    token: "",
    username: "",
  },
  setUser: () => {},
});

export default UserContext;
