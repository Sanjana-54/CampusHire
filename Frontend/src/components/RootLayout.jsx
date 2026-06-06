import Navbar from "./Navbar";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F9F8FF",
      }}
    >
      <Navbar />

      <div >
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;