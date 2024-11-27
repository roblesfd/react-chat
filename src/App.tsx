import { Route, Routes } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import MainLayout from "./components/MainLayout";
import ChatView from "./views/ChatView";
import { jwtDecode } from "jwt-decode";
import ProtectedRouteClient from "./components/ProtectedRouteClient";
import LoggedInLayout from "./components/LoggedInLayout";
import { requestGetUserByToken } from "./api/apiUsers";
import { useEffect, useContext } from "react";
import UserContext from "./context/UserContext";
import { decodedEmpty } from "./utils/mockData";

function App() {
  const { setUser } = useContext(UserContext);
  const token: string = sessionStorage.getItem("jwt")
    ? JSON.parse(sessionStorage.getItem("jwt") as string)
    : "";
  const decodedUser = token
    ? (jwtDecode(token) as typeof decodedEmpty)
    : decodedEmpty;

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const data = await requestGetUserByToken(token);
        setUser(data);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRouteClient id={decodedUser.UserInfo.id} />}>
          <Route element={<LoggedInLayout />}>
            <Route index element={<ChatView />} />
          </Route>
        </Route>
        <Route path="/registrarse" element={<Signup />} />
        <Route path="/ingresar" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
