import { NavLink } from "react-router";


function Navbar() {
 const user = JSON.parse(
  localStorage.getItem("user")
);
console.log("Navbar User:", user);
const navStyle = ({ isActive }) => ({
  background: isActive
    ? "linear-gradient(90deg,#4C2F9E,#FF7043)"
    : "transparent",
  color: isActive ? "white" : "#2D1B69",
  padding: "8px 16px",
  borderRadius: "9999px",
});

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
             <NavLink to="/" style={navStyle}>
  Login
</NavLink> 

              <NavLink to="/register" style={navStyle}>
  Register
</NavLink>
            </>
          )}

          {user?.role === "student" && (
            <>
              <NavLink to="/student-dashboard" style={navStyle}>
  Dashboard
</NavLink>

<NavLink to="/companies" style={navStyle}>
  Companies
</NavLink>

<NavLink to="/applications" style={navStyle}>
  Applications
</NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink to="/admin-dashboard" style={navStyle}>
  Dashboard
</NavLink>

<NavLink to="/admin-applications" style={navStyle}>
  Manage Applications
</NavLink>
            </>
          )}

          {user && (
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
    className="px-4 py-2 rounded-full"
    style={{
      border: "2px solid #4C2F9E",
      color: "#2D1B69",
    }}
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