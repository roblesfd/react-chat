import { createContext } from "react";

export type ModalState = {
  isOpen: boolean;
  content: React.ReactNode | null;
};

type ModalContextType = {
  modal: ModalState;
  setModal: (modal: ModalState) => void;
};

const ModalContext = createContext<ModalContextType>({
  modal: {
    isOpen: false,
    content: "",
  },
  setModal: () => false,
});

export default ModalContext;
