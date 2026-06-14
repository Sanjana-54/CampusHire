import { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";

function Companies() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        const student = JSON.parse(
          localStorage.getItem("user")
        );

        const res = await axios.get(
          `http://localhost:4000/students/eligible-companies/${student._id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setCompanies(res.data.payload);

      } catch (err) {

        console.log(err);

      }

    };

    fetchCompanies();

  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

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
          />
        ))}

      </div>

    </div>
  );
}

export default Companies;