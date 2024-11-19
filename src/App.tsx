import { Route, Routes } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import MainLayout from "./components/MainLayout";
import ChatView from "./views/ChatView";
import { jwtDecode } from "jwt-decode";
import ProtectedRouteClient from "./components/ProtectedRouteClient";
import LoggedInLayout from "./components/LoggedInLayout";


function App() {
  const token = sessionStorage.getItem("jwt")
  let decoded = {
    UserInfo: {
    username:"", role:"", id:""
  }
}; 
  if(token) {
    decoded = jwtDecode(token);
    console.log(decoded)
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route element={<ProtectedRouteClient id={decoded.UserInfo.id} />}>
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
