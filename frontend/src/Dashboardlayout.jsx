// DashboardLayout.jsx

import { Outlet } from "react-router-dom";
import DashboardNav from "../Component/DasNavbar";

function DashboardLayout() {
  return (
    <div>
      <DashboardNav />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;