import StudentSidebar from "./StudentSidebar";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-slate-100">

      <StudentSidebar />

      <div className="md:ml-64 p-6">

        <div className="bg-white rounded-3xl p-8 max-w-2xl shadow-sm">

          <h1
            className="text-3xl font-bold mb-6"
            style={{ color: "#2D1B69" }}
          >
            My Profile
          </h1>

          <div className="space-y-5">

            <div>
              <p className="text-slate-500">
                Name
              </p>
              <p className="font-semibold text-lg">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Email
              </p>
              <p className="font-semibold text-lg">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Branch
              </p>
              <p className="font-semibold text-lg">
                {user.branch}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                CGPA
              </p>
              <p className="font-semibold text-lg">
                {user.cgpa}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Role
              </p>
              <p className="font-semibold text-lg">
                {user.role}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;