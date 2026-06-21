import { NavLink,useLocation } from "react-router";

function Navbar() {

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );


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
  className="bg-white"
>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 gap-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">
           <span style={{ color: "#2D1B69" }}>
            Campus
          </span>

          <span style={{ color: "#FF7043" }}>
            Hire
          </span>
        </h1>

     <div className="flex flex-wrap justify-center gap-3 md:gap-6 items-center">
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

        </div>

      </div>
    </div>
  );
}

export default Navbar;