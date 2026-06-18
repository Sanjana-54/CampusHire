
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalApplications: 0,
    selectedStudents: 0,
  });

  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    placedStudents: 0,
    placementPercentage: 0,
  });

  const [companies, setCompanies] = useState([]);

  const [applicationAnalytics,
setApplicationAnalytics] =
useState({
  applied: 0,
  shortlisted: 0,
  selected: 0,
  rejected: 0
});

  const getDashboardStats = async () => {
    try {

      const res = await axios.get(
        "https://campushire-pk1f.onrender.com/admin/dashboard-stats",
        {
          withCredentials: true,
        }
      );

      setStats(res.data.payload);

    } catch (err) {

      console.log(err);

    }
  };

  const getAnalytics = async () => {
    try {

      const res = await axios.get(
        "https://campushire-pk1f.onrender.com/admin/analytics",
        {
          withCredentials: true,
        }
      );

      setAnalytics(res.data.payload);

    } catch (err) {

      console.log(err);

    }
  };

  const getCompanies = async () => {
    try {

      const res = await axios.get(
        "https://campushire-pk1f.onrender.com/admin/companies",
        {
          withCredentials: true,
        }
      );

      setCompanies(res.data.payload);

    } catch (err) {

      console.log(err);

    }
  };

  const getApplicationAnalytics =
async () => {

  try {

    const res = await axios.get(
      "https://campushire-pk1f.onrender.com/admin/application-analytics",
      {
        withCredentials: true
      }
    );

    setApplicationAnalytics(
      res.data.payload
    );

  } catch (err) {

    console.log(err);

  }

};

  useEffect(() => {

    document.title =
      "CampusHire | Dashboard";

    getDashboardStats();
    getAnalytics();
    getCompanies();
   getApplicationAnalytics();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="md:ml-64 p-6">

        {/* Header */}

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back, {user?.name} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Manage companies, students and placement drives.
          </p>

        </div>

        {/* Main Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-slate-600 font-medium">
              Students
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {stats.totalStudents}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-slate-600 font-medium">
              Companies
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {stats.totalCompanies}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-slate-600 font-medium">
              Applications
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {stats.totalApplications}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-slate-600 font-medium">
              Selected
            </h2>

            <p className="text-4xl font-bold text-orange-600 mt-3">
              {stats.selectedStudents}
            </p>
          </div>

        </div>

        {/* Placement Analytics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="bg-white rounded-2xl p-6">

            <h2 className="text-slate-600 font-medium">
              Total Students
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {analytics.totalStudents}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6">

            <h2 className="text-slate-600 font-medium">
              Placed Students
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {analytics.placedStudents}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6">

            <h2 className="text-slate-600 font-medium">
              Placement %
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {analytics.placementPercentage}%
            </p>

          </div>

        </div>

        {/* Recent Companies */}

        <div className="bg-white rounded-2xl p-6 mt-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Recent Companies
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Company
                  </th>

                  <th className="text-left py-3">
                    Package
                  </th>

                  <th className="text-left py-3">
                    Drive Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {companies.slice(0, 5).map((company) => (

                  <tr
                    key={company._id}
                    className="border-b"
                  >

                    <td className="py-3">
                      {company.companyName}
                    </td>

                    <td>
                      {company.package} LPA
                    </td>

                    <td>
                      {company.driveDate?.slice(0, 10)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
</div>
{/* Application Analytics */}
<div className="grid md:grid-cols-4 gap-6 mt-6">

  <div className="bg-white rounded-2xl p-6">
    <h2>Applied</h2>
    <p className="text-4xl font-bold text-blue-600">
      {applicationAnalytics.applied}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-6">
    <h2>Shortlisted</h2>
    <p className="text-4xl font-bold text-yellow-600">
      {applicationAnalytics.shortlisted}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-6">
    <h2>Selected</h2>
    <p className="text-4xl font-bold text-green-600">
      {applicationAnalytics.selected}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-6">
    <h2>Rejected</h2>
    <p className="text-4xl font-bold text-red-600">
      {applicationAnalytics.rejected}
    </p>
  </div>

</div>
        </div>

      </div>



  );
}

export default Dashboard;



