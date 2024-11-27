import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ModalContext from "../context/ModalContext";

type ModalProps = {
  width?: string;
};

const Modal: React.FC<ModalProps> = ({ width = "80" }) => {
  const { modal, setModal } = useContext(ModalContext);
  const { isOpen, content } = modal;

  const handleModalClose = () => {
    setModal({
      isOpen: false,
      content: null,
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Verifica si el click no se hizo desde el ModalContent
    if (e.currentTarget === e.target) {
      handleModalClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          data-testid="modal"
          id="modal"
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary-900  bg-opacity-80 transition duration-300 ease-in-out z-20"
          onClick={handleContainerClick}
        >
          <div
            style={{ maxWidth: width }}
            className={`bg-white min-w-86 min-h-48 p-8 relative rounded  text-primary-500  text-center`}
          >
            {content}
            <button
              className="absolute top-0 right-1 bg-transparent  p-2 mt-1 rounded"
              onClick={handleModalClose}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
