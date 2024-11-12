import "@testing-library/jest-dom";
import MessageInput from "../../components/MessageInput";
import { fireEvent, render, screen } from "@testing-library/react";

describe("MessageInput", () => {
  const handleSendMessageMock = jest.fn();
  it("renderiza el componente", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        inputTextDefault="Introduce"
      />
    );
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("contiene el texto con el valor 'Introduce'", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        inputTextDefault="Introduce"
      />
    );
    const msgInput = screen.getByDisplayValue("Introduce");
    expect(msgInput).toBeInTheDocument();
  });

  it("muestra el picker de emojis al dar click al boton de emoji", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        inputTextDefault="Introduce"
      />
    );
    const emojiPickerBtn = screen.getByTitle("Enviar emoji");
    fireEvent.click(emojiPickerBtn);
    expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();
  });

  it("oculta el picker de emojis al dar 2 clicks al boton de emoji", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        inputTextDefault="Introduce"
      />
    );
    const emojiPickerBtn = screen.getByTitle("Enviar emoji");
    fireEvent.click(emojiPickerBtn);
    const picker = screen.getByTestId("emoji-picker");
    fireEvent.click(emojiPickerBtn);

    expect(picker).not.toBeInTheDocument();
  });

  it("el boton para enviar mensaje esta disabled cuando se renderiza el componente", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        inputTextDefault=""
      />
    );
    const sendBtn = screen.getByTitle("Enviar mensaje");
    expect(sendBtn).toBeDisabled();
  });

  it("el botón de enviar mensaje no está deshabilitado cuando hay texto en el input", () => {
    render(
      <MessageInput handleSendMessage={jest.fn()} inputTextDefault="Hola" />
    );
    const sendButton = screen.getByTitle("Enviar mensaje");
    expect(sendButton).not.toBeDisabled();
  });

  it("resetea el contenido del input al dar click al boton de enviar mensaje", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        inputTextDefault=""
      />
    );
    const sendBtn = screen.getByTitle("Enviar mensaje");
    fireEvent.click(sendBtn);
    const input = screen
      .getByTestId("message-input")
      .querySelector("#enviar-mensaje");
    expect(input?.getAttribute("value")).toBe("");
  });
});
