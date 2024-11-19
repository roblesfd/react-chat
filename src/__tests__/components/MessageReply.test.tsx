import "@testing-library/jest-dom";
import MessageReply from "../../components/MessageReply";
import { fireEvent, render, screen } from "@testing-library/react";
import { dataMessage } from "../../utils/mockData";

describe("MessageReply", () => {
  const setisVisibleMock = jest.fn();
  const setFocusedMessageMock = jest.fn();
  const msg = { ...dataMessage };

  beforeEach(() => {
    render(<MessageReply 
      setIsVisible={setisVisibleMock} message={msg}
      setFocusedMessage={setFocusedMessageMock} 
      />
    );
  });

  it("renderiza el componente", () => {
    expect(screen.getByTestId("message-reply")).toBeInTheDocument();
  });

  it("contiene el texto 'Responder a mensaje' en el tag h3", () => {
    expect(screen.getByText("Responder a mensaje")).toBeInTheDocument();
  });

  it("contiene un button con el title 'Cancelar respuesta'", () => {
    const msgEdit = screen.getByTestId("message-reply");
    const btn = msgEdit.querySelector("button");
    const btnTitle = btn.getAttribute("title");

    expect(btn).toBeInTheDocument();
    expect(btnTitle).toBe("Cancelar respuesta");
  });

  it("llama a setIsVisible con 'false' al hacer clic en el botón de cancelar", () => {
    const cancelButton = screen.getByTitle("Cancelar respuesta");
    fireEvent.click(cancelButton);
    expect(setisVisibleMock).toHaveBeenCalledWith(false);
  });
});
