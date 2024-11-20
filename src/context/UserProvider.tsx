import { ReactNode, useState } from "react";
import UserContext, { UserState } from "./UserContext";

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>({
    id: "",
    createdAt: "",
    email: "",
    friends: [],
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
