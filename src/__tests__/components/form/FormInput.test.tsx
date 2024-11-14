import "@testing-library/jest-dom";

import { render, screen, fireEvent, act } from "@testing-library/react";
import { Formik } from "formik";
import FormInput from "../../../components/form/FormInput";

describe("FormInput", () => {
  const renderFormInput = (props: any) =>
    render(
      <Formik initialValues={{ [props.inputName]: "" }} onSubmit={() => {}}>
        <FormInput {...props} />
      </Formik>
    );

  it("renderiza correctamente el input con la etiqueta para Nombre de usuario", () => {
    renderFormInput({
      inputType: "text",
      labelText: "Nombre de usuario",
      inputName: "username",
    });

    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
  });

  it("renderiza correctamente el input con la etiqueta para Nombre", () => {
    renderFormInput({
      inputType: "text",
      labelText: "Nombre",
      inputName: "name",
    });

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
  });

  it("renderiza correctamente el input con la etiqueta para Apellido", () => {
    renderFormInput({
      inputType: "text",
      labelText: "Apellido",
      inputName: "username",
    });

    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
  });

  it("renderiza correctamente el input con la etiqueta para Correo electrónico", () => {
    renderFormInput({
      inputType: "email",
      labelText: "Correo electrónico",
      inputName: "email",
    });

    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
  });

  it("renderiza correctamente el input con la etiqueta para Contraseña", () => {
    renderFormInput({
      inputType: "password",
      labelText: "Contraseña",
      inputName: "password",
    });

    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  // it("muestra mensaje de error cuando hay un error de validación", async () => {
  //   renderFormInput({
  //     inputType: "text",
  //     labelText: "Nombre",
  //     inputName: "name",
  //   });

  //   const input = screen.getByLabelText("Nombre");
  //   fireEvent.blur(input);
  //   expect(
  //     screen.queryByText("Este campo es obligatorio")
  //   ).not.toBeInTheDocument();

  //   fireEvent.focus(input);
  //   fireEvent.change(input, { target: { value: "" } });
  //   fireEvent.blur(input);
  //   expect(screen.getByText("Este campo es obligatorio")).toBeInTheDocument();
  // });

  it("aplica clases de estilo en función de los estados touched y error", async () => {
    renderFormInput({
      inputType: "text",
      labelText: "Nombre",
      inputName: "name",
    });

    const input = screen.getByLabelText("Nombre");
    await act(async () => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "John Doe" } });
      fireEvent.blur(input);
    });

    expect(input.className).toMatch(/outline-green-300/);

    // await act(async () => {
    //   fireEvent.focus(input);
    //   fireEvent.change(input, { target: { value: "" } });
    //   fireEvent.blur(input);
    // });

    // expect(input.className).toMatch(/outline-red-400/);
  });
});
