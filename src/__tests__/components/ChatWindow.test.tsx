import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatWindow from "../../components/ChatWindow";

describe("ChatWindow", () => {
  beforeEach(() => {
    render(<ChatWindow />);
  });

  it("renderiza el componente ChatHeader como hijo", () => {
    const chatHeader = screen.getByTestId("chat-header");
    expect(chatHeader).toBeInTheDocument();
  });

  it("no renderiza el componente MessageList como hijo", () => {
    const messageList = screen.queryByTestId("message-list");
    expect(messageList).not.toBeInTheDocument();
  });

  it("verifica si el componente MessageEdit aun no esta renderizado como hijo", () => {
    const messageEdit = screen.queryByText("Editar mensaje");
    expect(messageEdit).not.toBeInTheDocument();
  });

  it("renderiza el componente MessageInput como hijo", () => {
    const messageList = screen.getByTestId("message-input");
    expect(messageList).toBeInTheDocument();
  });

  it("renderiza el componente ConversationList como hijo", () => {
    const conversationList = screen.getByTestId("conversation-list");
    expect(conversationList).toBeInTheDocument();
  });
});
