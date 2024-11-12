import "@testing-library/jest-dom";
import Modal from "../../components/Modal";
import { fireEvent, render, screen } from "@testing-library/react";
import ModalContext from "../../context/ModalContext";
import { ReactNode } from "react";

describe("Modal", () => {
  const renderModalWithContext = (isOpen: boolean, content: ReactNode) => {
    const setModal = jest.fn();
    const modal = { isOpen, content };

    render(
      <ModalContext.Provider value={{ modal, setModal }}>
        <Modal />
      </ModalContext.Provider>
    );

    return { setModal };
  };

  it("renderiza cuando isOpen es true", () => {
    renderModalWithContext(true, <p>Contenido del modal</p>);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });

  it("no renderiza cuando isOpen es false", () => {
    renderModalWithContext(false, <p>Contenido del modal</p>);

    const modal = screen.queryByTestId("modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("muestra el contenido del modal", () => {
    renderModalWithContext(true, <p>Contenido del modal</p>);

    const modal = screen.getByText("Contenido del modal");
    expect(modal).toBeInTheDocument();
  });

  it("cierra el modal al hacer clic en el fondo", () => {
    const { setModal } = renderModalWithContext(
      true,
      <p>Contenido del modal</p>
    );

    const modal = screen.getByTestId("modal");
    fireEvent.click(modal);
    expect(setModal).toHaveBeenCalledWith({ isOpen: false, content: null });
  });

  it("cierra el modal al hacer clic en el botón de cerrar", () => {
    const { setModal } = renderModalWithContext(
      true,
      <p>Contenido del modal</p>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(setModal).toHaveBeenCalledWith({ isOpen: false, content: null });
  });

  it("no cierra el modal si se hace clic dentro del contenido del modal", () => {
    const { setModal } = renderModalWithContext(
      true,
      <p>Contenido del modal</p>
    );

    const modalContent = screen.getByText("Contenido del modal");
    fireEvent.click(modalContent);
    expect(setModal).not.toHaveBeenCalled();
  });
});
