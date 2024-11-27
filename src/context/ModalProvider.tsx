import { ReactNode, useState } from "react";
import ModalContext, { ModalState } from "./ModalContext";
import Modal from "../components/Modal";

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: "",
  });

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Modal width={"400px"} />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
