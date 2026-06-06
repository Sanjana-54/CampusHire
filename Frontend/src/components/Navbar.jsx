import { NavLink } from "react-router";

function Navbar() {
  return (
    <div
  className="bg-white border-b-4"
  style={{
    borderColor: "#4C2F9E"
  }}
>

    
      <div className="flex justify-between items-center px-10 py-5">

        <h1 className="text-4xl font-bold">
          <span style={{ color: "#2D1B69" }}>
            Campus
          </span>

          <span style={{ color: "#FF7043" }}>
            Hire
          </span>
        </h1>

        <div className="flex gap-8">

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
            <button
  onClick={() => {
    localStorage.removeItem("student");
    window.location.href = "/";
  }}
>
  Logout
</button>
        </div>

      </div>
    </div>
  );
}

export default Navbar;