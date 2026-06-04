import { NavLink } from "react-router";

function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            CampusHire
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-3">

          <NavLink
            to="/"
            className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            Register
          </NavLink>

          <NavLink
            to="/student-dashboard"
            className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            Student
          </NavLink>

          <NavLink
            to="/admin-dashboard"
            className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            Admin
          </NavLink>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;