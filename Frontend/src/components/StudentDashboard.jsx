import { useEffect } from "react";

function StudentDashboard() {

  useEffect(() => {
    document.title = "CampusHire | Student Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 mb-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, Student 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Track your placements and applications.
        </p>

      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-slate-700">
            Eligible Companies
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            5
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-slate-700">
            Applications
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            3
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-slate-700">
            Selected
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-4">
            1
          </p>
        </div>

      </div>

      {/* Eligible Companies Section */}
      <div className="bg-white rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Eligible Companies
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="border border-slate-200 rounded-xl p-5">

            <h3 className="text-xl font-semibold">
              TCS
            </h3>

            <p className="text-slate-500 mt-2">
              Package: 7 LPA
            </p>

            <p className="text-slate-500">
              Drive Date: 10 June 2026
            </p>

            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Apply
            </button>

          </div>

          <div className="border border-slate-200 rounded-xl p-5">

            <h3 className="text-xl font-semibold">
              Infosys
            </h3>

            <p className="text-slate-500 mt-2">
              Package: 6 LPA
            </p>

            <p className="text-slate-500">
              Drive Date: 15 June 2026
            </p>

            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Apply
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;