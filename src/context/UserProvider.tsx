import { ReactNode, useState } from "react";
import UserContext from "./UserContext";
import { UserProps } from "../types/UserProps";

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProps>({
    id: "",
    createdAt: "",
    updatedAt: "",
    email: "",
    lastname: "",
    name: "",
    role: "",
    token: "",
    username: "",
  });


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
