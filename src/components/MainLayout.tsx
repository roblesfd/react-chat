import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-primary-500 min-h-screen text-white">
      <Outlet />
    </div>
  );
}

export default MainLayout;
