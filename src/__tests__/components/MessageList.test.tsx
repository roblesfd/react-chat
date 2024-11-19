import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MessageList from "../../components/MessageList";
import { mockMessageList } from "../../utils/mockData";

describe("MessageList", () => {
  const deleteMessageMock = jest.fn();
  const editMessageMock = jest.fn();
  const replyMessageMock = jest.fn();

  beforeEach(() => {
    render(
      <MessageList
        height={500}
        messageList={mockMessageList}
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        onReplyMessage={replyMessageMock}
      />
    );
  })

  it("renderiza el componente", () => {
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
  });

  it("muestra una lista de MessageItem como hijo cuando se pasa un array con datos", () => {
    const msgList = screen.getByTestId("message-list");
    const msgItem = screen.getAllByTestId("message-item");
    expect(msgList).toContainElement(msgItem[0]);
  });
});

describe("MessageList sin datos", () => {
  const deleteMessageMock = jest.fn();
  const editMessageMock = jest.fn();
  const replyMessageMock = jest.fn();

  it("no muestra una lista de MessageItem como hijo cuando se pasa un array vacio", () => {
    render(
      <MessageList
        height={500}
        messageList={[]}
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        onReplyMessage={replyMessageMock}
      />
    );

    const msgList = screen.getByTestId("message-list");
    const msgItem = screen.queryByTestId("message-item");
    expect(msgList).not.toContainElement(msgItem);
  });
});
