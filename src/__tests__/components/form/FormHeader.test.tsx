import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormHeader from "../../../components/form/FormHeader";

describe("FormHeader", () => {
  it("renderiza el componente", () => {
    render(<FormHeader children={<></>} />);
    expect(screen.getByTestId("form-header")).toBeInTheDocument();
  });
});
