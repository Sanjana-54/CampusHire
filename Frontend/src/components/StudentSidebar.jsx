import { NavLink } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

function StudentSidebar() {
  const [count, setCount] =
  useState(0);

useEffect(() => {

  const fetchCount =
    async () => {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const res =
        await axios.get(
          `https://campushire-pk1f.onrender.com/students/unread-count/${user._id}`,
          {
            withCredentials: true
          }
        );

      setCount(
        res.data.payload
      );

    };

  fetchCount();

  const interval =
    setInterval(
      fetchCount,
      10000
    );

  return () =>
    clearInterval(interval);

}, []);
  return (
    <div className="bg-white shadow-lg h-screen w-56 fixed left-0 top-0 hidden md:flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold">
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
          to="/student-dashboard"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/companies"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          🏢 Companies
        </NavLink>

        

        <NavLink
          to="/applications"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
        >
          📄 Applications
        </NavLink>
      
       
       <NavLink
          to="/profile"
          className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium"
       >
            👤 Profile
     </NavLink>
     <NavLink
  to="/notifications"
  className="px-4 py-3 rounded-xl hover:bg-slate-100 font-medium flex justify-between"
>
  <span>
    🔔 Notifications
  </span>

  {count > 0 && (

    <span
      className="
      bg-red-500
      text-white
      text-xs
      px-2
      rounded-full"
    >
      {count}
    </span>

  )}
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




export default StudentSidebar;