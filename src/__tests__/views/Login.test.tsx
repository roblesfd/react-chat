import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../views/Login";
import { BrowserRouter as Router } from "react-router-dom";
import * as apiAuth from "../../api/apiAuth";
import toast from "react-hot-toast";

jest.mock("../../api/apiAuth", () => ({
  onLogin: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("Login", () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  it("renderiza el componente", () => {
    expect(screen.getByTestId("login")).toBeInTheDocument();
  });

  it("muestra los inputs de Nombre de usuario y Contraseña", () => {
    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("tiene el titulo 'Ingresa a tu cuenta'", () => {
    expect(screen.getByText("Ingresa a tu cuenta")).toBeInTheDocument();
  });

  it("muestra un button con el texto 'Ingresar'", () => {
    expect(
      screen.getByRole("button", { name: /Ingresar/i })
    ).toBeInTheDocument();
  });

  // it("should submit the form with the correct values", async () => {
  //   apiAuth.onLogin.mockResolvedValueOnce({
  //     ok: true,
  //     json: () => ({ token: "fake-token" }),
  //   });

  //   fireEvent.change(screen.getByLabelText("Nombre de usuario"), {
  //     target: { value: "fernandorob" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Contraseña"), {
  //     target: { value: "123456q@" },
  //   });
  //   fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

  //   await waitFor(() => {
  //     expect(apiAuth.onLogin).toHaveBeenCalledWith({
  //       username: "fernandorob",
  //       password: "123456q@",
  //     });
  //   });

  //   expect(toast.success).toHaveBeenCalledWith("Has iniciado sesión");
  // });
});
