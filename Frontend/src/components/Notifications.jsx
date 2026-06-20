import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";

function Notifications() {

const [notifications,
setNotifications] = useState([]);

const getRelativeTime = (date) => {


const seconds =
  Math.floor(
    (new Date() - new Date(date))
    / 1000
  );

const minutes =
  Math.floor(seconds / 60);

const hours =
  Math.floor(minutes / 60);

const days =
  Math.floor(hours / 24);

if (days > 0)
  return `${days} day(s) ago`;

if (hours > 0)
  return `${hours} hour(s) ago`;

if (minutes > 0)
  return `${minutes} minute(s) ago`;

return "Just now";


};

const getStyle = (type) => {


if (type === "Selected") {

  return {
    border:
      "border-green-500",
    icon: "🎉"
  };

}

if (type === "Shortlisted") {

  return {
    border:
      "border-blue-500",
    icon: "⭐"
  };

}

if (type === "Rejected") {

  return {
    border:
      "border-red-500",
    icon: "❌"
  };

}

return {
  border:
    "border-orange-500",
  icon: "📄"
};


};

const fetchNotifications =
async () => {


  try {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const res =
      await axios.get(
        `https://campushire-pk1f.onrender.com/students/notifications/${user._id}`,
        {
          withCredentials: true
        }
      );

    setNotifications(
      res.data.payload
    );

  } catch (err) {

    console.log(err);

  }

};


useEffect(() => {


fetchNotifications();


}, []);

return (


<div className="min-h-screen bg-slate-100">

  <StudentSidebar />

  <div className="md:ml-64 p-6">

    <h1
      className="text-3xl font-bold mb-6"
      style={{
        color: "#2D1B69"
      }}
    >
      Notifications
    </h1>

    {notifications.length === 0 ? (

      <div className="bg-white p-10 rounded-3xl text-center shadow-sm">

        <h2 className="text-xl font-semibold text-slate-600">

          No Notifications Yet

        </h2>

        <p className="text-slate-400 mt-2">

          Updates from companies will appear here.

        </p>

      </div>

    ) : (

      <div className="space-y-4">

        {notifications.map(
          (notification) => {

            const style =
              getStyle(
                notification.type
              );

            return (

              <div
                key={notification._id}
                className={`
                  bg-white
                  p-5
                  rounded-2xl
                  shadow-sm
                  border-l-4
                  ${style.border}
                  ${
                    !notification.isRead
                      ? "bg-violet-50"
                      : ""
                  }
                `}
              >

                <h3
                  className="
                  font-bold
                  text-lg
                  mb-2"
                >
                  {notification.companyName ||
                    "Company Update"}
                </h3>

                <p
                  className={
                    !notification.isRead
                      ? "font-semibold"
                      : ""
                  }
                >
                  {style.icon}
                  {" "}
                  {notification.message}
                </p>

                <div
                  className="
                  mt-3
                  text-sm
                  text-slate-500"
                >

                  <p>
                    {
                      getRelativeTime(
                        notification.createdAt
                      )
                    }
                  </p>

                  <p>
                    {
                      new Date(
                        notification.createdAt
                      ).toLocaleString()
                    }
                  </p>

                </div>

              </div>

            );

          }
        )}

      </div>

    )}

  </div>

</div>


);

}

export default Notifications;
