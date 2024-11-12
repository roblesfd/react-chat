import "@testing-library/jest-dom";

import ConversationItem from "../../components/ConversationItem";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ConversationItem", () => {
  const emptyData = {
    fullName: "",
    messageShort: "",
  };
  const data = {
    fullName: "Pedro paramo",
    messageShort: "Mensaje",
  };

  it("renderiza con objeto vacio como prop", () => {
    render(<ConversationItem data={emptyData} />);
    const convItem = screen.getByTestId("conversation-item");
    expect(convItem).toBeInTheDocument();
  });

  it("muestran los valores pasados al prop data", () => {
    render(<ConversationItem data={data} />);
    expect(screen.getByText(data.fullName)).toBeInTheDocument();
    expect(screen.getByText(`${data.messageShort}...`)).toBeInTheDocument();
  });

  it("llama al handler onClick cuando se da click", () => {
    const handleClick = jest.fn();
    render(<ConversationItem data={data} onClick={handleClick} />);
    const conversationItem = screen.getByTestId("conversation-item");
    fireEvent.click(conversationItem);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("muestra los valores del props fullName y messageShort correctamente", () => {
    render(<ConversationItem data={data} />);
    expect(screen.getByText("Pedro paramo")).toBeInTheDocument();
    expect(screen.getByText("Mensaje...")).toBeInTheDocument();
  });

  it("muestra el componente Dropdown como hijo", () => {
    render(<ConversationItem data={data} />);
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });
});
