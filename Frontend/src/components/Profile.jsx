import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import StudentSidebar from "./StudentSidebar";

function Profile() {

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        `https://campushire-pk1f.onrender.com/students/update-profile/${user._id}`,
        user,
        { withCredentials: true }
      );

      setUser(res.data.payload);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.payload)
      );

      toast.success("Profile Updated");
      setIsEditing(false);

    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <StudentSidebar />

      <div className="md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl w-full shadow-sm overflow-hidden">
         {/* Header banner */}
          <div
            className="h-28 w-full"
            style={{
              background: "linear-gradient(90deg,#4C2F9E,#FF7043)"
            }}
          />

          <div className="flex flex-col items-center -mt-16 pb-6 px-8">
            <div
              className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-4xl font-bold shadow-md"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-2xl font-bold mt-3" style={{ color: "#2D1B69" }}>
              {user.name}
            </h1>

            <p className="text-slate-400 text-sm">
              {user.email}
            </p>
          </div>

          <div className="px-8 pb-8">

            {/* Personal Info */}
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
              Personal Info
            </p>

           <div className="grid md:grid-cols-2 gap-x-20 gap-y-8 mb-8">  <div>
                <p className="text-slate-500 mb-1">
                  👤 Name
                </p>
                {isEditing ? (
                  <input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                  />
                ) : (
                  <p className="font-semibold">{user.name}</p>
                )}
              </div>

              <div>
                <p className="text-slate-500 mb-1">
                  ✉️ Email
                </p>
                <p className="font-semibold">{user.email}</p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">
                  📞 Phone
                </p>
                {isEditing ? (
                  <input
                     value={user.phone || ""}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    placeholder="Add your phone number"
                    className="border rounded-lg p-2 w-full"
                  />
                ) : user.phone ? (
                  <p className="font-semibold">{user.phone}</p>
                ) : (
                  <p className="text-slate-400 italic">Not added yet</p>
                )}
              </div>
            </div>

            {/* Academic Info */}
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
              Academic Info
            </p>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-8 mb-8">
              <div>
                <p className="text-slate-500 mb-1">
                  🎓 Branch
                </p>
                {isEditing ? (
                  <input
                    value={user.branch}
                    onChange={(e) => setUser({ ...user, branch: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                  />
                ) : (
                  <p className="font-semibold">{user.branch}</p>
                )}
              </div>

              <div>
                <p className="text-slate-500 mb-1">
                  🏆 CGPA
                </p>
                {isEditing ? (
                  <input
                    value={user.cgpa || ""}
                    onChange={(e) => setUser({ ...user, cgpa: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                  />
                ) : (
                  <span
                    className="inline-block font-bold px-3 py-1 rounded-full text-white"
                    style={{ background: "linear-gradient(90deg,#4C2F9E,#FF7043)" }}
                  >
                    {user.cgpa}
                  </span>
                )}
              </div>
            </div>

            {/* Placement Info */}
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
              Placement Info
            </p>

            <div className="mb-8">
              <p className="text-slate-500 mb-1">
                📄 Resume Link
              </p>
              {isEditing ? (
                <input
               value={user.resumeLink || ""}
                  onChange={(e) => setUser({ ...user, resumeLink: e.target.value })}
                  placeholder="Paste your resume link (Google Drive, etc.)"
                  className="border rounded-lg p-2 w-full"
                />
              ) : user.resumeLink ? (

  <a
    href={user.resumeLink}
    target="_blank"
    rel="noreferrer"
    className="text-indigo-600 underline font-semibold"
  >
    View Resume
  </a>

) : (
                <p className="text-slate-400 italic">Not added yet</p>
              )}
            </div>

            {isEditing ? (
              <button
                onClick={saveProfile}
                className="text-white px-5 py-3 rounded-xl"
                style={{ background: "linear-gradient(90deg,#4C2F9E,#FF7043)" }}
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-white px-5 py-3 rounded-xl"
                style={{ background: "linear-gradient(90deg,#4C2F9E,#FF7043)" }}
              >
                ✏️ Edit Profile
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;