import { useEffect, useState } from "react";
import axios from "axios";

function AdminApplications() {

  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "http://localhost:4000/admin/applications",
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setApplications(res.data.payload);
    } catch (err) {

      console.log(err);

    }

  };
  const updateStatus = async (applicationId, status) => {

  try {

    await axios.patch(
      `http://localhost:4000/admin/update-status/${applicationId}`,
      {
        status,
      },
      {
        withCredentials: true,
      }
    );

    fetchApplications();

  } catch (err) {

    console.log(err);

  }

};

  useEffect(() => {

    document.title =
      "CampusHire | Manage Applications";

    fetchApplications();

  }, []);

  useEffect(() => {
  console.log(applications);
}, [applications]);

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1
        className="text-4xl font-bold mb-8"
        style={{ color: "#2D1B69" }}
      >
        Manage Applications
      </h1>

      <div className="space-y-4">

        {applications.map((application) => (

          <div
            key={application._id}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >

            <h2 className="text-xl font-semibold">
              {application.studentId?.name}
            </h2>

            <p>
              Company:
              {" "}
              {application.companyId?.companyName}
            </p>

            <p>
              Status:
              {" "}
              {application.status}
            </p>

            <p>
              Round:
              {" "}
              {application.round}
            </p>
           <select
  defaultValue={application.status}
  onChange={(e) =>
    updateStatus(
      application._id,
      e.target.value
    )
  }
  className="border rounded-lg px-3 py-2 mt-3"
>
  <option value="Applied">
    Applied
  </option>

  <option value="Shortlisted">
    Shortlisted
  </option>

  <option value="Selected">
    Selected
  </option>

  <option value="Rejected">
    Rejected
  </option>
</select>
          </div>
         
        ))}

      </div>

    </div>

  );
}

export default AdminApplications;