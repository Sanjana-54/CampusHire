import { Outlet } from "react-router";
import Navbar from "./Navbar";

function RootLayout() {
  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar/>

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default RootLayout;