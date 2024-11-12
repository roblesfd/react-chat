import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Login from "../../views/Login";

describe("Login", () => {
  it("renderiza el componente Login", () => {
    render(<Login />);
    expect(true).toBeTruthy();
  });
});
