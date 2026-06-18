import { useEffect, useState } from "react";
import axios from "axios";

import StudentSidebar from "./StudentSidebar";

function StudentDashboard() {

 

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  /*console.log("DASHBOARD FILE CHECK");
console.log("Dashboard User:", user);
console.log(
  "Dashboard localStorage:",
  localStorage.getItem("user")
);*/
  const [stats, setStats] = useState({
    eligibleCompanies: 0,
    applications: 0,
    selected: 0,
  });

  const [applications, setApplications] = useState([]);
  const [progress, setProgress] = useState({
  applied: 0,
  shortlisted: 0,
  selected: 0,
  rejected: 0
});
const [upcomingDrives, setUpcomingDrives] =
useState([]);

s
  const getDashboardStats = async () => {

    try {

      const res = await axios.get(
        `https://campushire-pk1f.onrender.com/students/dashboard-stats/${user._id}`,
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
        `https://campushire-pk1f.onrender.com/students/applications/${user._id}`,
        {
          withCredentials: true,
        }
      );

      setApplications(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };

  const getApplicationProgress = async () => {

  try {

    const res = await axios.get(
      `https://campushire-pk1f.onrender.com/students/application-progress/${user._id}`,
      {
        withCredentials: true
      }
    );

    setProgress(res.data.payload);

  } catch (err) {

    console.log(err);

  }

};

const getUpcomingDrives = async () => {

  try {

    const res = await axios.get(
      `https://campushire-pk1f.onrender.com/students/eligible-companies/${user._id}`,
      {
        withCredentials: true
      }
    );

   setUpcomingDrives(
  res.data.payload
    .filter(
      company =>
        new Date(company.driveDate) >= new Date()
    )
    .slice(0, 5)
);

  } catch (err) {

    console.log(err);

  }

};
  useEffect(() => {

    document.title = "CampusHire | Dashboard";

    getDashboardStats();
    getRecentApplications();
    getApplicationProgress();
    getUpcomingDrives();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

  <StudentSidebar />

  <div className="md:ml-64 p-6">

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
     <div className="mt-8">

  <h2
    className="text-2xl font-bold mb-4"
    style={{ color: "#2D1B69" }}
  >
    Application Progress
  </h2>
<div className="grid md:grid-cols-4 gap-6">

  <div className="rounded-3xl p-6 bg-blue-100 shadow-sm">
    <h3 className="text-blue-700 font-semibold">
      Applied
    </h3>
    <p className="text-4xl font-bold text-blue-800 mt-2">
      {progress.applied}
    </p>
  </div>

  <div className="rounded-3xl p-6 bg-amber-100 shadow-sm">
    <h3 className="text-amber-700 font-semibold">
      Shortlisted
    </h3>
    <p className="text-4xl font-bold text-amber-800 mt-2">
      {progress.shortlisted}
    </p>
  </div>

  <div className="rounded-3xl p-6 bg-green-100 shadow-sm">
    <h3 className="text-green-700 font-semibold">
      Selected
    </h3>
    <p className="text-4xl font-bold text-green-800 mt-2">
      {progress.selected}
    </p>
  </div>

  <div className="rounded-3xl p-6 bg-red-100 shadow-sm">
    <h3 className="text-red-700 font-semibold">
      Rejected
    </h3>
    <p className="text-4xl font-bold text-red-800 mt-2">
      {progress.rejected}
    </p>
  </div>

</div>
</div>

<div className="mt-8">

  <h2
    className="text-2xl font-bold mb-4"
    style={{ color: "#2D1B69" }}
  >
    Upcoming Drives
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {upcomingDrives.map((company) => (

      <div
        key={company._id}
       className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition"
        
      >

        <h3 className="text-2xl font-bold text-slate-800">
  {company.companyName}
</h3>

<p className="mt-3 text-slate-600">
  Package: {company.package} LPA
</p>

<p className="mt-2 text-slate-600">
  Drive Date: {company.driveDate?.slice(0,10)}
</p>

      </div>

    ))}

  </div>

</div>
      {/* Recent Applications */}

      <div className="mt-10">

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
                className="flex justify-between items-center mb-4"
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
</div>
  );

}

export default StudentDashboard;