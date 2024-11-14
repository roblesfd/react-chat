import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormFooter from "../../../components/form/FormFooter";

describe("FormFooter", () => {
  it("renderiza el componente", () => {
    render(<FormFooter children={<></>} />);
    expect(screen.getByTestId("form-footer")).toBeInTheDocument();
  });
  it("renderiza correctamente con el contenido pasado como children", () => {
    render(
      <FormFooter>
        <button>Ingresar</button>
      </FormFooter>
    );

    const footer = screen.getByTestId("form-footer");
    expect(footer).toBeInTheDocument();
    expect(screen.getByText("Ingresar")).toBeInTheDocument();
  });
});
