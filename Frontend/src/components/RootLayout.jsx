import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";

function RootLayout() {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  const isStudentPage =
    location.pathname === "/student-dashboard" ||
    location.pathname === "/companies" ||
    location.pathname === "/applications";

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F9F8FF",
      }}
    >
      {!isAdminPage && !isStudentPage && <Navbar />}

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;