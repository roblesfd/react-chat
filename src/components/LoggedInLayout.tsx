import toast from "react-hot-toast";
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom";
import ModalContext from "../context/ModalContext";
import { useContext } from "react";
import UserContext from "../context/UserContext";



const LoggedInLayout = () => {

    const {setModal} = useContext(ModalContext);
    const {user} = useContext(UserContext);

    const modalContent = 
    <div className="grid grid-cols-8 gap-x-4 gap-y-3 ">
        <div className="col-span-8 mb-2">
            <h3 className="font-semibold text-lg">Datos de la cuenta</h3>
        </div>
        <div className="col-span-4 text-right">
            <p className="font-semibold">Nombre:</p>
        </div>
        <div className="col-span-4 text-left">
            <p className="font-medium">{user.name}</p>
        </div>
        <div className="col-span-4 text-right">
            <p className="font-semibold">Apellido:</p>
        </div>
        <div className="col-span-4 text-left">
            <p className="font-medium">{user.lastname}</p>
        </div>
        <div className="col-span-4 text-right">
            <p className="font-semibold">Usuario:</p>
        </div>
        <div className="col-span-4 text-left">
            <p className="font-medium">{user.username}</p>
        </div>
        <div className="col-span-4 text-right">
            <p className="font-semibold">Correo electrónico:</p>
        </div>
        <div className="col-span-4 text-left">
            <p className="font-medium">{user.email}</p>
        </div>
    </div>

    return (
<div data-testid="logged-in-layout">
    <NavBar title="React Chat" position="static">
        <ul className="flex flex-col md:flex-row justify-between items-center gap-2 text-secondary-40">
        <li
             className="hover:bg-secondary-200 rounded-md px-3 py-2 cursor-pointer text-center"
             onClick={() => {
                setModal({
                    isOpen:true,
                    content:modalContent
                });
            }}>
                Mi cuenta
            </li>
            <li
             className="hover:bg-secondary-200 rounded-md px-3 py-2 cursor-pointer  text-center"
             onClick={() => {
                sessionStorage.removeItem("jwt");
                toast.loading("Cerrando sesión...")
                setTimeout(() =>{
                    window.location.href = "/ingresar"
                }, 2000)
            }}>
                Cerrar sesión
            </li>
        </ul>
    </NavBar>
    <div className="bg-primary-500 h-auto text-quatertiary-100 px-2 md:px-16">
        <Outlet />
    </div>
</div>
    )
}

export default LoggedInLayout