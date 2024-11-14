import { Route, Routes } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import MainLayout from "./components/MainLayout";
import ChatView from "./views/ChatView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ChatView />} />
        <Route path="/registrarse" element={<Signup />} />
        <Route path="/ingresar" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
