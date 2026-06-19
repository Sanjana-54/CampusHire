 import { NavLink } from "react-router";

function Sidebar() {
  return (
    <div className="bg-white shadow-lg h-screen w-56 fixed left-0 top-0 hidden md:flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b">
        <h1
          className="text-3xl font-bold"
          style={{
            background:
              "linear-gradient(90deg,#4C2F9E,#FF7043)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span style={{ color: "#2D1B69" }}>
            Campus
          </span>

          <span style={{ color: "#FF7043" }}>
            Hire
            </span>
        </h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col p-4 gap-3">

        <NavLink
          to="/admin/dashboard"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/companies"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          🏢 Companies
        </NavLink>

        <NavLink
          to="/admin/students"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          👨‍🎓 Students
        </NavLink>

        <NavLink
          to="/admin/applications"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          📄 Applications
        </NavLink>
      </div>

      {/* Logout */}
      <div className="mt-auto p-4 border-t">
        <button
          className="w-full text-white py-3 rounded-xl"
          style={{
            background:
              "linear-gradient(90deg,#4C2F9E,#FF7043)",
          }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;