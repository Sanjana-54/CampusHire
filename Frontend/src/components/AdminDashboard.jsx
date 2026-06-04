import { useEffect } from "react";

function AdminDashboard() {

  useEffect(() => {
    document.title = "CampusHire | Admin Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 mb-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage companies, students and placement drives.
        </p>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-slate-600 font-medium">
            Students
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            120
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-slate-600 font-medium">
            Companies
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            15
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-slate-600 font-medium">
            Applications
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            85
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-slate-600 font-medium">
            Selected
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-3">
            24
          </p>
        </div>

      </div>

      {/* Add Company Form */}
      <div className="bg-white rounded-2xl p-6 mb-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Add Company
        </h2>

        <form className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Company Name"
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Minimum CGPA"
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Allowed Branches"
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Package (LPA)"
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="date"
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700"
          >
            Add Company
          </button>

        </form>

      </div>

      {/* Recent Companies */}
      <div className="bg-white rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
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

                <th className="text-left py-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-3">
                  TCS
                </td>

                <td>
                  7 LPA
                </td>

                <td>
                  10-06-2026
                </td>

                <td>
                  <button className="text-blue-600 font-medium">
                    Edit
                  </button>
                </td>

              </tr>

              <tr>

                <td className="py-3">
                  Infosys
                </td>

                <td>
                  6 LPA
                </td>

                <td>
                  15-06-2026
                </td>

                <td>
                  <button className="text-blue-600 font-medium">
                    Edit
                  </button>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;