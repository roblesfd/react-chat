import "@testing-library/jest-dom";
import MessageItem from "../../components/MessageItem";
import { fireEvent, render, screen } from "@testing-library/react";
import { dataMessage } from "../../utils/mockData";

describe("MessageItem", () => {
  const deleteMessageMock = jest.fn();
  const editMessageMock = jest.fn();

  it("renderiza el componente", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={dataMessage}
      />
    );
    expect(screen.getByTestId("message-item")).toBeInTheDocument();
  });

  it("contiene el id '0'", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={dataMessage}
      />
    );
    const msgItem = screen.getByTestId("message-item");
    expect(msgItem).toHaveAttribute("id", "0");
  });

  it("muestra boton de dropdown si el prop type es 'sender'", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={dataMessage}
      />
    );
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  it("no muestra boton de dropdown si el prop type es 'recipient'", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={{ ...dataMessage, type: "recipient" }}
      />
    );
    const dropdown = screen.queryByTestId("dropdown");
    expect(dropdown).toBeNull();
  });

  it("Muestra los botones Editar y Eliminar al hacer click en el Dropdown", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={dataMessage}
      />
    );

    const dropdownBtn = screen.getByRole("button");
    fireEvent.click(dropdownBtn);
    const editBtn = screen.getByText("Editar");
    const deleteBtn = screen.getByText("Eliminar");
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it("Se ejecuta el evento onClick al hacer click al boton Editar", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={dataMessage}
      />
    );

    const dropdownBtn = screen.getByRole("button");
    fireEvent.click(dropdownBtn);
    const editBtn = screen.getByText("Editar");
    fireEvent.click(editBtn);
    expect(editMessageMock).toHaveBeenCalledTimes(1);
  });

  it("Se ejecuta el evento onClick al hacer click al boton Eliminar", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={dataMessage}
      />
    );

    const dropdownBtn = screen.getByRole("button");
    fireEvent.click(dropdownBtn);
    const deleteBtn = screen.getByText("Eliminar");
    fireEvent.click(deleteBtn);
    expect(deleteMessageMock).toHaveBeenCalledTimes(1);
  });

  it("muestra el texto 'Editado' cuando el prop isEdited es true", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={{ ...dataMessage, isEdited: true }}
      />
    );
    const editedtText = screen.getByText("Editado");
    expect(editedtText).toBeInTheDocument();
  });

  it("muestra el texto 'Cuerpo del mensaje' para el prop content", () => {
    render(
      <MessageItem
        onDeleteMessage={deleteMessageMock}
        onEditMessage={editMessageMock}
        message={{ ...dataMessage, isEdited: true }}
      />
    );
    const content = screen.getByText("Cuerpo del mensaje");
    expect(content).toBeInTheDocument();
  });
});
