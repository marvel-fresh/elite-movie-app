import { useState } from "react";
import { Outlet } from "react-router";

import DashboardHeader from "./dashboard.header";
import DashboardSidebar from "./dashboard.sidebar";

import "../global.css";

function LandingLayout() {
  const [isLoggedIn] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const logOut = () => {
    
  };

  return (
    <>
      <DashboardHeader
        isLoggedIn={isLoggedIn}
        openSidebar={() =>
          setIsSidebarOpen(true)
        }
      />

      <main className="content">

      
        <aside className="sidebar">
          <DashboardSidebar
            logOut={logOut}
            isOpen={isSidebarOpen}
            closeSidebar={() =>
              setIsSidebarOpen(false)
            }
          />
        </aside>

      
        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />
        )}

        
        <div className="container">
          <Outlet />
        </div>

      </main>
    </>
  );
}

export default LandingLayout;