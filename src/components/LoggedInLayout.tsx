import toast from "react-hot-toast";
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom";



const LoggedInLayout = () => {

    return (
<div data-testid="logged-in-layout">
    <NavBar title="React Chat" bgColor="primary-500">
        <ul className="flex justify-between items-center">
            <li
             className="hover:bg-primary-200 rounded-md px-3 py-2 cursor-pointer"
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
    <Outlet />
</div>
    )
}

export default LoggedInLayout