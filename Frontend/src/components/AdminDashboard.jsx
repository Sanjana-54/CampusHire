import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminDashboard() {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const user = JSON.parse(
  localStorage.getItem("user")
);

  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState({
  totalStudents: 0,
  totalCompanies: 0,
  totalApplications: 0,
  selectedStudents: 0,
});
  // Fetch companies
  const getCompanies = async () => {

    try {

      const res = await axios.get(
        "http://localhost:4000/admin/companies",
        {
          withCredentials: true,
        }
      );

      setCompanies(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };
  
  const getDashboardStats = async () => {

  try {

    const res = await axios.get(
      "http://localhost:4000/admin/dashboard-stats",
      {
        withCredentials: true,
      }
    );

    setStats(res.data.payload);

  } catch (err) {

    console.log(err);

  }

};
  const deleteCompany = async (id) => {

  try {

    await axios.delete(
      `http://localhost:4000/admin/company/${id}`,
      {
        withCredentials: true,
      }
    );

    toast.success("Company Deleted");

    getCompanies();

  } catch (err) {

    toast.error("Delete Failed");

    console.log(err);

  }

};
  // Add company
  const addCompany = async (companyData) => {

    try {

      await axios.post(
        "http://localhost:4000/admin/add-company",
        companyData,
        {
          withCredentials: true,
        }
      );

      toast.success("Company Added Successfully");

      getCompanies();

      reset();

    } catch (err) {

      toast.error("Failed To Add Company");

      console.log(err);

    }

  };

  useEffect(() => {

  document.title = "CampusHire | Admin Dashboard";

  getCompanies();
  getDashboardStats();

}, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}

      <div className="bg-white rounded-2xl p-6 mb-6">

       <h1 className="text-3xl font-bold text-slate-800">
  Welcome Back, {user?.name} 👋
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
  {stats.totalStudents}
</p>

        </div>

        <div className="bg-white rounded-2xl p-6">

          <h2 className="text-slate-600 font-medium">
            Companies
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {companies.length}
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

      {/* Add Company Form */}

      <div className="bg-white rounded-2xl p-6 mb-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Add Company
        </h2>

        <form
          className="grid md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(addCompany)}
        >

          <input
            type="text"
            placeholder="Company Name"
            {...register("companyName")}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Minimum CGPA"
            {...register("minCGPA")}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Allowed Branches"
            {...register("allowedBranches")}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Package (LPA)"
            {...register("package")}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="date"
            {...register("driveDate")}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
           className="text-white rounded-xl py-3"
style={{
  background:
    "linear-gradient(90deg,#4C2F9E,#FF7043)",
}}
          >
            Add Company
          </button>

        </form>

      </div>

      {/* Companies Table */}

      <div className="bg-white rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Companies
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
                  Min CGPA
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

              {companies.map((company) => (

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
                    {company.minCGPA}
                  </td>

                  <td>
                    {company.driveDate
                      ? company.driveDate.slice(0, 10)
                      : "N/A"}
                  </td>
                  <td>

  <button
    onClick={() => deleteCompany(company._id)}
    className="text-red-600 font-medium"
  >
    Delete
  </button>

</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;