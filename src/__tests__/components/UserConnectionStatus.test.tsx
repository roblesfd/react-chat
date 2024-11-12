import "@testing-library/jest-dom";
import UserConnectionStatus from "../../components/UserConnectionStatus";
import { render, screen } from "@testing-library/react";
import { getTimeElapsed } from "../../utils/dateUtils";

describe("UserConnectionStatus", () => {
  it("renderiza el componente", () => {
    render(<UserConnectionStatus timeElapsed="" />);
    expect(screen.getByTestId("user-connection-status")).toBeInTheDocument();
  });

  it("muestra el texto 'Última vez activo:'", () => {
    render(<UserConnectionStatus timeElapsed="" />);
    expect(screen.getByText("Última vez activo:")).toBeInTheDocument();
  });

  const fechaPasada = new Date("2024-11-05T15:27:00");
  const fechaActual = new Date("2024-11-11T15:27:00");
  const timeElapsed = getTimeElapsed(fechaPasada, fechaActual);

  it("muestra la fecha de ultima conexion 'Hace 6 días'", () => {
    render(<UserConnectionStatus timeElapsed={timeElapsed} />);
    expect(screen.getByText("Hace 6 días")).toBeInTheDocument();
  });
});
