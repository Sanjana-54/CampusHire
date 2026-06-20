import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";

function Notifications() {

  const [notifications,
  setNotifications] = useState([]);

  const fetchNotifications =
    async () => {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `https://campushire-pk1f.onrender.com/students/notifications/${user._id}`,
        {
          withCredentials: true
        }
      );

      setNotifications(
        res.data.payload
      );

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

        <div className="space-y-4">

          {notifications.map(
            (notification) => (

              <div
                key={notification._id}
                className={`
                bg-white
                p-5
                rounded-2xl
                shadow-sm
                border-l-4

                ${
                  notification.isRead
                    ? "border-slate-300"
                    : "border-orange-500"
                }
              `}
              >

                <p>
                  {notification.message}
                </p>

                <p
                  className="
                  text-sm
                  text-slate-500
                  mt-2"
                >
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default Notifications;