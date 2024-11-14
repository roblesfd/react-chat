import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Signup from "../../views/Signup";
import { BrowserRouter as Router } from "react-router-dom";

describe("Signup", () => {
  it("renderiza el componente Signup", () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });
});
