import axios from "axios";
import { toast } from "react-hot-toast";
function CompanyCard({ company }) {
  const applyForCompany = async () => {

  try {

    const student = JSON.parse(
      localStorage.getItem("user")
    );

    await axios.post(
      "https://campushire-pk1f.onrender.com/students/apply",
      {
        studentId: student._id,
        companyId: company._id,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Applied Successfully");

  } catch (err) {

      toast.error(
    err.response?.data?.message || "Application Failed"
  );

    console.log(err);

  }

};
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">

      <h3
        className="text-2xl font-bold mb-2"
        style={{ color: "#2D1B69" }}
      >
        {company.companyName}
      </h3>

      <p className="text-gray-500 mb-2">
        Package: {company.package} LPA
      </p>

      <p className="text-gray-500 mb-4">
        Minimum CGPA: {company.minCGPA}
      </p>

      <button
  onClick={applyForCompany}
  className="px-5 py-2 rounded-xl text-white"
  style={{
    backgroundColor: "#FF7043",
  }}
>
  Apply
</button>
    </div>
  );
}

export default CompanyCard;