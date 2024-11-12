import "@testing-library/jest-dom";
import App from "../../App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renderiza el componente App", () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
  it("renderiza ChatWindow como un hijo", () => {
    render(<App />);
    const chatWindow = screen.getByTestId("chat-window");
    expect(chatWindow).toBeInTheDocument();
  });
});
