import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-primary-500 min-h-screen text-quatertiary-100 py-8 md:py-12 px-6 md:px-16">
      <Outlet />
    </div>
  );
}

export default MainLayout;
