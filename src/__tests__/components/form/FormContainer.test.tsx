import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormContainer from "../../../components/form/FormContainer";

describe("FormContainer", () => {
  it("renderiza el componente", () => {
    render(<FormContainer onSubmit={() => {}} children={<></>} />);
    expect(screen.getByTestId("form-container")).toBeInTheDocument();
  });
});
