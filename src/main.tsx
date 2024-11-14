import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalProvider from "./context/ModalProvider";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <Toaster />
        <App />
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);
