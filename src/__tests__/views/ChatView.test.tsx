import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatView from "../../views/ChatView";

describe("ChatView", () => {
  it("renderiza el componente ChatView", () => {
    render(<ChatView />);
    expect(screen.getByTestId("chat-view")).toBeInTheDocument();
  });
});
