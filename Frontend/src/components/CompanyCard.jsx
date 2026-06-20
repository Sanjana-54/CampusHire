import axios from "axios";
import { toast } from "react-hot-toast";

function CompanyCard({ company,alreadyApplied}) {


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

  toast.success(
    "Applied Successfully"
  );

} catch (err) {

  toast.error(
    err.response?.data?.message ||
    "Application Failed"
  );

  console.log(err);

}


};

return (


<div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition duration-300 border border-slate-100">

  <div className="flex justify-between items-start mb-4">

    <h3
      className="text-2xl font-bold"
      style={{ color: "#2D1B69" }}
    >
      {company.companyName}
    </h3>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
      Eligible
    </span>

  </div>

  <div className="space-y-3">

    <p className="text-slate-600">
      💰 Package:
      <span className="font-semibold ml-2">
        {company.package} LPA
      </span>
    </p>
   
   <p className="text-slate-600">
  💼 Role:
  <span className="font-semibold ml-2">
    {company.role}
  </span>
</p>
<p className="text-slate-600">
  🌍 Location:
  <span className="font-semibold ml-2">
    {company.location}
  </span>
</p>
    <p className="text-slate-600">
      🎯 Min CGPA:
      <span className="font-semibold ml-2">
        {company.minCGPA}
      </span>
    </p>

    <p className="text-slate-600">
      🎓 Branches:
      <span className="font-semibold ml-2">
        {company.allowedBranches?.join(", ")}
      </span>
    </p>
<p className="text-slate-600">
  ⏰ Apply Before:
  <span className="font-semibold ml-2">
    {company.lastDateToApply}
  </span>
</p>
    <p className="text-slate-600">
      📅 Drive Date:
      <span className="font-semibold ml-2">
        {company.driveDate?.slice(0, 10)}
      </span>
     
    </p>
    <p className="text-slate-600">
  👥 Applied Students:
  <span className="font-semibold ml-2">
    {company.applicationCount}
  </span>
</p>

  </div>

  <button
  disabled={alreadyApplied}
  onClick={applyForCompany}
  className="mt-6 w-full py-3 rounded-xl text-white font-semibold"
  style={{
    background: alreadyApplied
      ? "#94A3B8"
      : "linear-gradient(90deg,#4C2F9E,#FF7043)"
  }}
>
  {alreadyApplied
    ? "Already Applied"
    : "Apply Now"}
</button>

</div>


);

}

export default CompanyCard;
