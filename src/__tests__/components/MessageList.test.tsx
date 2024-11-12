import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MessageList from "../../components/MessageList";
import { mockMessageList } from "../../utils/mockData";

describe("MessageList", () => {
  const deleteMessageMock = jest.fn();
  const editMessageMock = jest.fn();

  it("renderiza el componente", () => {
    render(
      <MessageList
        height={500}
        messageList={mockMessageList}
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
      />
    );
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
  });

  it("muestra una lista de MessageItem como hijo cuando se pasa un array con datos", () => {
    render(
      <MessageList
        height={500}
        messageList={mockMessageList}
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
      />
    );
    const msgList = screen.getByTestId("message-list");
    const msgItem = screen.getAllByTestId("message-item");
    expect(msgList).toContainElement(msgItem[0]);
  });

  it("no muestra una lista de MessageItem como hijo cuando se pasa un array vacio", () => {
    render(
      <MessageList
        height={500}
        messageList={[]}
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
      />
    );
    const msgList = screen.getByTestId("message-list");
    const msgItem = screen.queryByTestId("message-item");
    expect(msgList).not.toContainElement(msgItem);
  });
});
