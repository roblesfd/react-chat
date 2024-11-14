import { Route, Routes } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import Signup from "./views/Signup";
import Login from "./views/Login";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<ChatWindow />} />
        <Route path="/registrarse" element={<Signup />} />
        <Route path="/ingresar" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
