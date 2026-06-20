import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import StudentSidebar from "./StudentSidebar";

function Profile() {

const [isEditing, setIsEditing] =
useState(false);

const [user, setUser] =
useState(
JSON.parse(
localStorage.getItem("user")
)
);

const saveProfile = async () => {


try {

  const res = await axios.put(
    `https://campushire-pk1f.onrender.com/students/update-profile/${user._id}`,
    user,
    {
      withCredentials: true,
    }
  );

  setUser(res.data.payload);

  localStorage.setItem(
    "user",
    JSON.stringify(
      res.data.payload
    )
  );

  toast.success(
    "Profile Updated"
  );

  setIsEditing(false);

} catch (err) {

  console.log(err);

  toast.error(
    "Update Failed"
  );

}


};

return (


<div className="min-h-screen bg-slate-100">

  <StudentSidebar />

  <div className="md:ml-64 p-6">

    <div className="bg-white rounded-3xl p-8 max-w-3xl shadow-sm">

      <div className="flex flex-col items-center mb-8">

        <div
          className="
          w-28
          h-28
          rounded-full
          bg-gradient-to-r
          from-indigo-500
          to-purple-500
          text-white
          flex
          items-center
          justify-center
          text-4xl
          font-bold"
        >
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1
          className="text-3xl font-bold mt-4"
          style={{
            color: "#2D1B69"
          }}
        >
          My Profile
        </h1>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <p className="text-slate-500">
            Name
          </p>

          {isEditing ? (

            <input
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name:
                    e.target.value
                })
              }
              className="border rounded-lg p-2 w-full"
            />

          ) : (

            <p className="font-semibold">
              {user.name}
            </p>

          )}

        </div>

        <div>

          <p className="text-slate-500">
            Email
          </p>

          <p className="font-semibold">
            {user.email}
          </p>

        </div>

        <div>

          <p className="text-slate-500">
            Branch
          </p>

          {isEditing ? (

            <input
              value={user.branch}
              onChange={(e) =>
                setUser({
                  ...user,
                  branch:
                    e.target.value
                })
              }
              className="border rounded-lg p-2 w-full"
            />

          ) : (

            <p className="font-semibold">
              {user.branch}
            </p>

          )}

        </div>

        <div>

          <p className="text-slate-500">
            CGPA
          </p>

          {isEditing ? (

            <input
              value={user.cgpa}
              onChange={(e) =>
                setUser({
                  ...user,
                  cgpa:
                    e.target.value
                })
              }
              className="border rounded-lg p-2 w-full"
            />

          ) : (

            <p className="font-semibold">
              {user.cgpa}
            </p>

          )}

        </div>

        <div>

          <p className="text-slate-500">
            Phone
          </p>

          {isEditing ? (

            <input
              value={user.phone}
              onChange={(e) =>
                setUser({
                  ...user,
                  phone:
                    e.target.value
                })
              }
              className="border rounded-lg p-2 w-full"
            />

          ) : (

            <p className="font-semibold">
              {user.phone ||
                "Not Added"}
            </p>

          )}

        </div>

        <div>

          <p className="text-slate-500">
            Resume Link
          </p>

          {isEditing ? (

            <input
              value={
                user.resumeLink
              }
              onChange={(e) =>
                setUser({
                  ...user,
                  resumeLink:
                    e.target.value
                })
              }
              className="border rounded-lg p-2 w-full"
            />

          ) : user.resumeLink ? (

            <a
              href={
                user.resumeLink
              }
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>

          ) : (

            <p>
              Not Added
            </p>

          )}

        </div>

      </div>

      <div className="mt-8">

        {isEditing ? (

          <button
            onClick={
              saveProfile
            }
            className="text-white px-5 py-3 rounded-xl"
            style={{
              background:
                "linear-gradient(90deg,#4C2F9E,#FF7043)"
            }}
          >
            Save Changes
          </button>

        ) : (

          <button
            onClick={() =>
              setIsEditing(true)
            }
            className="text-white px-5 py-3 rounded-xl"
            style={{
              background:
                "linear-gradient(90deg,#4C2F9E,#FF7043)"
            }}
          >
            Edit Profile
          </button>

        )}

      </div>

    </div>

  </div>

</div>

);

}

export default Profile;
