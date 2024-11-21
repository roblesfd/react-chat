import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalProvider from "./context/ModalProvider";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/UserProvider";
import { SocketProvider } from "./context/SocketProvider";
import { getDecodedUser } from "./utils/misc";

const decodedUser = getDecodedUser();
const userId = decodedUser.UserInfo.id;
const serverUrl = process.env.BACKEND_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SocketProvider serverUrl={serverUrl as string} userId={userId}>
          <ModalProvider>
              <Toaster />
              <App />
          </ModalProvider>
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
