import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainLayout from "../../components/MainLayout";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="outlet" />,
}));

describe("MainLayout", () => {
  it("renderiza Outlet como hijo", () => {
    render(<MainLayout />);
    const outletElement = screen.getByTestId("outlet");
    expect(outletElement).toBeInTheDocument();
  });
});
