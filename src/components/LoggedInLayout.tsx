import toast from "react-hot-toast";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import ModalContext from "../context/ModalContext";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import AccountDataContainer from "./AccountDataContainer";
import AccountDataRow from "./AccountDataRow";

const LoggedInLayout = () => {
  const { setModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  const modalContent = user ? (
    <AccountDataContainer title="Datos de la cuenta">
      <AccountDataRow label="Nombre" value={user.name} />
      <AccountDataRow label="Apellido" value={user.lastname} />
      <AccountDataRow label="Usuario" value={user.username} />
      <AccountDataRow label="Correo electrónico" value={user.email} />
    </AccountDataContainer>
  ) : null;

  return (
    <div data-testid="logged-in-layout">
      <NavBar title="React Chat" position="static">
        <ul className="flex flex-col md:flex-row justify-between items-center gap-2 text-secondary-40">
          <li
            className="hover:bg-secondary-200 rounded-md px-3 py-2 cursor-pointer text-center"
            onClick={() => {
              setModal({
                isOpen: true,
                content: modalContent,
              });
            }}
          >
            Mi cuenta
          </li>
          <li
            className="hover:bg-secondary-200 rounded-md px-3 py-2 cursor-pointer  text-center"
            onClick={() => {
              sessionStorage.removeItem("jwt");
              toast.loading("Cerrando sesión...");
              setTimeout(() => {
                window.location.href = "/ingresar";
              }, 2000);
            }}
          >
            Cerrar sesión
          </li>
        </ul>
      </NavBar>
      <div className="h-auto text-quatertiary-100 px-2 md:px-16">
        <Outlet />
      </div>
    </div>
  );
};

export default LoggedInLayout;
