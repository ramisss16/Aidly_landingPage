import { Outlet } from "react-router-dom";
import { useState } from "react";
import DashboardNav from "../Component/DasNavbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DashboardNav
        onMenuClick={() => setSidebarOpen(true)}
      />

      <Outlet
        context={{
          sidebarOpen,
          setSidebarOpen,
        }}
      />
    </>
  );
}

export default DashboardLayout;