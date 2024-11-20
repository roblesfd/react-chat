import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
      <div className="bg-primary-500 h-full text-white">
        <Outlet />
      </div>
  );
}

export default MainLayout;
