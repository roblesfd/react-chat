import "@testing-library/jest-dom";
import MessageEdit from "../../components/MessageEdit";
import { fireEvent, render, screen } from "@testing-library/react";
import { dataMessage } from "../../utils/mockData";

describe("MessageEdit", () => {
  const setisVisibleMock = jest.fn();
  const msg = { ...dataMessage };

  beforeEach(() => {
    render(<MessageEdit setIsVisible={setisVisibleMock} message={msg} />);
  });

  it("renderiza el componente", () => {
    expect(screen.getByTestId("message-edit")).toBeInTheDocument();
  });

  it("contiene el texto 'Editar mensaje' en el tag h3", () => {
    expect(screen.getByText("Editar mensaje")).toBeInTheDocument();
  });

  it("contiene un button con el title 'Cancelar edición'", () => {
    const msgEdit = screen.getByTestId("message-edit");
    const btn = msgEdit.querySelector("button");
    const btnTitle = btn.getAttribute("title");

    expect(btn).toBeInTheDocument();
    expect(btnTitle).toBe("Cancelar edición");
  });

  it("llama a setIsVisible con 'false' al hacer clic en el botón de cancelar", () => {
    const cancelButton = screen.getByTitle("Cancelar edición");
    fireEvent.click(cancelButton);
    expect(setisVisibleMock).toHaveBeenCalledWith(false);
  });
});
