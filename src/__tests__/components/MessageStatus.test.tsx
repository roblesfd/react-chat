import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MessageStatus from "../../components/MessageStatus";

describe("MessageStatus", () => {
  it("renderiza el componente", () => {
    render(<MessageStatus />);
    expect(screen.getByTestId("message-status")).toBeInTheDocument();
  });
});
