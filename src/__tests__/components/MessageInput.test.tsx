import "@testing-library/jest-dom";
import MessageInput from "../../components/MessageInput";
import { fireEvent, render, screen } from "@testing-library/react";
import { dataMessage } from "../../utils/mockData";

describe("MessageInput", () => {
  const handleSendMessageMock = jest.fn();
  beforeAll(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      root: Element | null = null;
      rootMargin: string = "";
      thresholds: ReadonlyArray<number> = [];
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
      disconnect(): void {}
      observe(target: Element): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
      unobserve(target: Element): void {}
    }

    global.IntersectionObserver = MockIntersectionObserver;
  });
  beforeEach(() => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        messageType="new"
        message={dataMessage}
      />
    );
  })
  it("renderiza el componente", () => {
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("contiene el texto con el valor 'Cuerpo del mensaje'", () => {
    const msgInput = screen.getByDisplayValue("Cuerpo del mensaje");
    expect(msgInput).toBeInTheDocument();
  });

  it("muestra el picker de emojis al dar click al boton de emoji", () => {
    const emojiPickerBtn = screen.getByTitle("Enviar emoji");
    fireEvent.click(emojiPickerBtn);
    expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();
  });

  it("oculta el picker de emojis al dar 2 clicks al boton de emoji", () => {

    const emojiPickerBtn = screen.getByTitle("Enviar emoji");
    fireEvent.click(emojiPickerBtn);
    const picker = screen.getByTestId("emoji-picker");
    fireEvent.click(emojiPickerBtn);

    expect(picker).not.toBeInTheDocument();
  });

  it("el botón de enviar mensaje no está deshabilitado cuando hay texto en el input", () => {
    const sendButton = screen.getByTitle("Enviar mensaje");
    expect(sendButton).not.toBeDisabled();
  });

  it("resetea el contenido del input al dar click al boton de enviar mensaje", () => {
    const sendBtn = screen.getByTitle("Enviar mensaje");
    fireEvent.click(sendBtn);
    const input = screen
      .getByTestId("message-input")
      .querySelector("#enviar-mensaje");
    expect(input?.getAttribute("value")).toBe("");
  });
});

describe("MessageInput vacio", () =>{
  const handleSendMessageMock = jest.fn()
  it("el boton para enviar mensaje esta disabled cuando se renderiza el componente", () => {
    render(
      <MessageInput
        handleSendMessage={handleSendMessageMock}
        messageType="new"
        message={{...dataMessage, content: ""}}
      />
    );
    const sendBtn = screen.getByTitle("Enviar mensaje");
    expect(sendBtn).toBeDisabled();
  });
})
