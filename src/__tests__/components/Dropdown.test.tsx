import "@testing-library/jest-dom";
import Dropdown from "../../components/Dropdown";
import { fireEvent, render, screen } from "@testing-library/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

describe("Dropdown", () => {
  const buttonElement = (
    <button>
      <FontAwesomeIcon icon={faEllipsis} />
    </button>
  );

  beforeEach(() => {
    render(<Dropdown button={buttonElement} options={[]} />);
  });
  it("renderiza el componente", () => {
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  it("se paso un elemento button en el prop 'button'", () => {
    const renderedButton = screen.getByRole("button");
    expect(renderedButton).toBeInTheDocument();
  });

  it("el button tiene como texto un icon de fontawesome", () => {
    const icon = screen.getByRole("button").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("muestra la lista de opciones al hacer clic en el botón", () => {
    fireEvent.click(screen.getByRole("button"));
    const list = screen.getByTestId("dropdown").querySelector("ul");
    expect(list).toBeInTheDocument();
  });

  it("oculta la lista de opciones al hacer clic en el botón 2 veces", () => {
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    fireEvent.click(btn);
    const list = screen.getByTestId("dropdown").querySelector("ul");
    expect(list).not.toBeInTheDocument();
  });
});
