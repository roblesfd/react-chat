import "@testing-library/jest-dom";
import TypingIndicator from "../../components/TypingIndicator";
import { render, screen } from "@testing-library/react";

describe("TypingIndicator", () => {
  it("renderiza el componente", () => {
    render(<TypingIndicator />);
    expect(screen.getByTestId("typing-indicator")).toBeInTheDocument();
  });
});
