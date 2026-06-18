import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";

function RootLayout() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F9F8FF",
      }}
    >
      {!isAdminPage && <Navbar />}

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;