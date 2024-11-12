import "@testing-library/jest-dom";

import ConversationList from "../../components/ConversationList";
import { render, screen } from "@testing-library/react";

describe("ConversationList", () => {
  it("renderiza el componente con valor height 0 y data con array vacio ", () => {
    render(<ConversationList height={0} data={[]} />);
    const convList = screen.getByTestId("conversation-list");
    expect(convList).toBeInTheDocument();
  });

  it("muestra en el tag h3 el valor 'Conversaciones'", () => {
    render(<ConversationList height={0} data={[]} />);
    const title = screen.getByText("Conversaciones");
    expect(title).toBeInTheDocument();
  });

  const mockData = [{ fullName: "John Doe", messageShort: "Hello there!" }];
  it("renderiza componentes ConversationItem cuando el array contiene datos", () => {
    render(<ConversationList height={400} data={mockData} />);

    const conversationItems = screen.getAllByTestId("conversation-item");
    expect(conversationItems.length).toBe(mockData.length);

    expect(conversationItems[0]).toHaveTextContent(mockData[0].fullName);
    expect(conversationItems[0]).toHaveTextContent(mockData[0].messageShort);
  });

  it("Muestra el mensaje 'No hay usuarios' cuando se pasa un array vacio en el prop 'data'", () => {
    render(<ConversationList height={400} data={[]} />);
    const messageWhenEmpty = screen.getByText("No hay usuarios");
    expect(messageWhenEmpty).toBeInTheDocument();
  });
});
