import "@testing-library/jest-dom";
import App from "../../App";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("renderiza el componente App", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(true).toBeTruthy();
  });

  it("renderiza ChatWindow como un hijo", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const chatWindow = screen.getByTestId("chat-window");
    expect(chatWindow).toBeInTheDocument();
  });
});
