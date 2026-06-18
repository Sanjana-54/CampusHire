import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";

function Companies() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

 

  const [companies, setCompanies] = useState([]);
  const [eligibleStudents, setEligibleStudents] =
  useState([]);
  
  // Fetch companies
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
  
  

  const deleteCompany = async (id) => {

  try {

    await axios.delete(
      `https://campushire-pk1f.onrender.com/admin/company/${id}`,
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

      companyData.allowedBranches =
  companyData.allowedBranches
    .split(",")
    .map(branch => branch.trim());

await axios.post(
  "https://campushire-pk1f.onrender.com/admin/add-company",
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
  const getEligibleStudents = async (
  companyId
) => {

  try {

    const res = await axios.get(
     
  `https://campushire-pk1f.onrender.com/admin/eligible-students/${companyId}`,
  {
    withCredentials: true,
  }
);
     setEligibleStudents(
      res.data.payload
    );

  } catch (err) {

    console.log(err);

  }

};

  useEffect(() => {
  document.title = "CampusHire | Companies";

  getCompanies();
}, []);
  return (
    <div className="min-h-screen bg-slate-100">
    <Sidebar />
    <div className="md:ml-64 p-6">
    
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
            step="0.1"
           min="0"
           max="10"
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
  onClick={() =>
    getEligibleStudents(company._id)
  }
  className="text-blue-600 font-medium mr-4"
>
  Eligible Students
</button>

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
{eligibleStudents.length > 0 && (

  <div className="bg-white rounded-2xl p-6 mt-6">

    <h2 className="text-2xl font-bold mb-5">
      Eligible Students
    </h2>

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left py-3">
            Name
          </th>

          <th className="text-left py-3">
            Email
          </th>

          <th className="text-left py-3">
            Branch
          </th>

          <th className="text-left py-3">
            CGPA
          </th>

        </tr>

      </thead>

      <tbody>

        {eligibleStudents.map(student => (

          <tr
            key={student._id}
            className="border-b"
          >

            <td className="py-3">
              {student.name}
            </td>

            <td>
              {student.email}
            </td>

            <td>
              {student.branch}
            </td>

            <td>
              {student.cgpa}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}
        </div>

      </div>


</div>

      </div>
    
  
  );
}



export default Companies
