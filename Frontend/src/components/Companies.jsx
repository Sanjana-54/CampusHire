import { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";
import StudentSidebar from "./StudentSidebar";

function Companies() {

  const [companies, setCompanies] = useState([]);
const [appliedCompanies, setAppliedCompanies] =
  useState([]);

  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        const student = JSON.parse(
          localStorage.getItem("user")
        );

        const res = await axios.get(
          `https://campushire-pk1f.onrender.com/students/eligible-companies/${student._id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setCompanies(res.data.payload);
       const appRes = await axios.get(
  `https://campushire-pk1f.onrender.com/students/applications/${student._id}`,
  {
    withCredentials: true,
  }
);

setAppliedCompanies(
  appRes.data.appliedCompanyIds
);
      } catch (err) {

        console.log(err);

      }

    };

    fetchCompanies();

  }, []);

  return (
  <div className="min-h-screen bg-slate-100">

    <StudentSidebar />

    <div className="md:ml-64 p-6">

      <h1
        className="text-4xl font-bold mb-8"
        style={{ color: "#2D1B69" }}
      >
        Eligible Companies
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {companies.map((company) => (
          <CompanyCard
  key={company._id}
  company={company}
  alreadyApplied={
    appliedCompanies.includes(
      company._id
    )
  }
/>
        ))}

      </div>

    </div>

  </div>
);
}
export default Companies;