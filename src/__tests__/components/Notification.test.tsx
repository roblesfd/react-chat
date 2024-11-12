import "@testing-library/jest-dom";
import Notification from "../../components/Notification";
import { render, screen } from "@testing-library/react";

describe("Notification", () => {
  it("renderiza el componente", () => {
    render(<Notification />);
    expect(screen.getByTestId("notification")).toBeInTheDocument();
  });
});
