import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";

function Applications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    document.title = "CampusHire | Applications";

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const student = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `https://campushire-pk1f.onrender.com/students/applications/${student._id}`,
        {
          withCredentials: true,
        }
      );

      setApplications(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };

  const getStatusColor = (status) => {

    if (status === "Applied") return "#4C2F9E";

    if (status === "Shortlisted") return "#FF7043";

    if (status === "Selected") return "#22C55E";

    return "#EF4444";

  };

  return (
    <div className="min-h-screen bg-slate-100">
  <StudentSidebar />
  <div className="md:ml-64 p-6">
    
  
    <div className="max-w-7xl mx-auto ">

      <h1
        className="text-4xl font-bold mb-8"
        style={{ color: "#2D1B69" }}
      >
        My Applications
      </h1>

      <div className="space-y-5">

        {applications.map((application) => (

          <div
            key={application._id}
            className="bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-semibold">
                {application.companyId?.companyName}
              </h2>

              <p className="text-gray-500 mt-1">
                Round: {application.round}
              </p>

              <p className="text-gray-500">
                {new Date(
                  application.appliedDate
                ).toLocaleDateString()}
              </p>

            </div>

            <span
              className="px-5 py-2 rounded-full text-white"
              style={{
                backgroundColor: getStatusColor(
                  application.status
                ),
              }}
            >
              {application.status}
            </span>

          </div>

        ))}

      </div>

    </div>

    </div>
</div>
  );
}

export default Applications;