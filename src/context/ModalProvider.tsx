import { ReactNode, useEffect, useState } from "react";
import ModalContext, { ModalState } from "./ModalContext";
import Modal from "../components/Modal";

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: "",
  });
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setRenderComponent(true);
  });

  if (!renderComponent) return <></>;

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
