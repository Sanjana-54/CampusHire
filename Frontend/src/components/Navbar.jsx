import { NavLink } from "react-router";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );
console.log("Navbar User:", user);

  return (
    <div
      className="bg-white border-b-4"
      style={{ borderColor: "#4C2F9E" }}
    >
      <div className="flex justify-between items-center px-10 py-5">

        <h1 className="text-4xl font-bold text-red-500">
          <span style={{ color: "#2D1B69" }}>
            Campus
          </span>

          <span style={{ color: "#FF7043" }}>
            Hire
          </span>
        </h1>

        <div className="flex gap-8 items-center">

          {!user && (
            <>
              <NavLink
                to="/"
                style={{ color: "#2D1B69" }}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                style={{ color: "#2D1B69" }}
              >
                Register
              </NavLink>
            </>
          )}

          {user?.role === "student" && (
            <>
              <NavLink
                to="/student-dashboard"
                style={{ color: "#2D1B69" }}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/companies"
                style={{ color: "#2D1B69" }}
              >
                Companies
              </NavLink>

              <NavLink
                to="/applications"
                style={{ color: "#2D1B69" }}
              >
                Applications
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/admin-dashboard"
                style={{ color: "#2D1B69" }}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin-applications"
                style={{ color: "#2D1B69" }}
              >
                Manage Applications
              </NavLink>
            </>
          )}

          {user && (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              style={{ color: "#2D1B69" }}
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default Navbar;

