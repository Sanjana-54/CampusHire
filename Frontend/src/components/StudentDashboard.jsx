import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function StudentDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    eligibleCompanies: 0,
    applications: 0,
    selected: 0,
  });

  const [applications, setApplications] = useState([]);

  const getDashboardStats = async () => {

    try {

      const res = await axios.get(
        ` https://campushire-pk1f.onrender.com/students/dashboard-stats/${user._id}`,
        {
          withCredentials: true,
        }
      );

      setStats(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };

  const getRecentApplications = async () => {

    try {

      const res = await axios.get(
        ` https://campushire-pk1f.onrender.com/students/applications/${user._id}`,
        {
          withCredentials: true,
        }
      );

      setApplications(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    document.title = "CampusHire | Dashboard";

    getDashboardStats();
    getRecentApplications();

  }, []);

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* Welcome Section */}

      <div
        className="rounded-3xl p-8 text-white mb-8"
        style={{
          background:
            "linear-gradient(135deg,#2D1B69 0%, #4C2F9E 100%)",
        }}
      >

        <h1 className="text-4xl font-bold mb-2">
          Welcome Back, {user?.name} 👋
        </h1>

        <div className="flex gap-4 mt-5">

          <button
            onClick={() => navigate("/companies")}
            className="px-5 py-3 rounded-xl text-white font-semibold"
            style={{
              background:
                "linear-gradient(90deg,#4C2F9E,#FF7043)",
            }}
          >
            View Companies
          </button>

          <button
            onClick={() => navigate("/applications")}
            className="px-5 py-3 rounded-xl  text-white font-semibold"
            style={{
              background: "linear-gradient(90deg,#4C2F9E,#FF7043)",
            }}
          >
            My Applications
          </button>

        </div>

        <p className="text-violet-100 mt-3">
          Track your placements and applications.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500 mb-2">
            Eligible Companies
          </h3>

          <p
            className="text-4xl font-bold"
            style={{ color: "#2D1B69" }}
          >
            {stats.eligibleCompanies}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500 mb-2">
            Applications
          </h3>

          <p
            className="text-4xl font-bold"
            style={{ color: "#2D1B69" }}
          >
            {stats.applications}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500 mb-2">
            Selected
          </h3>

          <p
            className="text-4xl font-bold"
            style={{ color: "#FF7043" }}
          >
            {stats.selected}
          </p>

        </div>

      </div>

      {/* Recent Applications */}

      <div>

        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "#2D1B69" }}
        >
          Recent Applications
        </h2>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          {applications.length === 0 ? (

            <p className="text-gray-500">
              No applications found.
            </p>

          ) : (

            applications.map((application) => (

              <div
                key={application._id}
                className="flex justify-between mb-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {application.companyId?.companyName}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {new Date(
                      application.appliedDate
                    ).toLocaleDateString()}
                  </p>

                </div>

                <span
                  className="px-4 py-2 rounded-full text-white text-sm"
                  style={{
                    backgroundColor:
                      application.status === "Applied"
                        ? "#4C2F9E"
                        : application.status === "Selected"
                        ? "#22C55E"
                        : application.status === "Rejected"
                        ? "#EF4444"
                        : "#FF7043"
                  }}
                >
                  {application.status}
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

export default StudentDashboard;