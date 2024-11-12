import "@testing-library/jest-dom";
import MessageItem from "../../components/MessageItem";
import { render, screen } from "@testing-library/react";
import MessageStatus from "../../components/MessageStatus";

describe("MessageStatus", () => {
  it("renderiza el componente", () => {
    render(<MessageStatus />);
    expect(screen.getByTestId("message-status")).toBeInTheDocument();
  });
});
