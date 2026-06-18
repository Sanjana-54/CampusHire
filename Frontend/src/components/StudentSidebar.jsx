import { NavLink } from "react-router";

function StudentSidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg p-6">

      <h1 className="text-2xl font-bold mb-10">
        CampusHire
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink to="/student-dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/companies">
          Companies
        </NavLink>

        <NavLink to="/applications">
          Applications
        </NavLink>

      </nav>

    </div>
  );
}

export default StudentSidebar;