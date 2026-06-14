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
            className="bg-white rounded-3xl p-6 shadow-md border border-gray-100"
          >

            <div className="flex justify-between items-center">

  <div>

    <h2
      className="text-2xl font-bold"
      style={{ color: "#2D1B69" }}
    >
      {application.studentId?.name}
    </h2>

    <p className="text-gray-600 mt-2">
  Company:
  <span
    className="font-semibold ml-2"
    style={{ color: "#4C2F9E" }}
  >
    {application.companyId?.companyName || "Company Deleted"}
  </span>
</p>

    <p className="text-gray-600">
      Round:
      <span className="font-semibold ml-2">
        {application.round}
      </span>
    </p>

  </div>

  <div>

    <span
      className="px-4 py-2 rounded-full text-white"
      style={{
        backgroundColor:
          application.status === "Applied"
            ? "#4C2F9E"
            : application.status === "Selected"
            ? "#22C55E"
            : application.status === "Rejected"
            ? "#EF4444"
            : "#FF7043"
      }}
    >
      {application.status}
    </span>

  </div>

</div>
           <select
  defaultValue={application.status}
  onChange={(e) =>
    updateStatus(
      application._id,
      e.target.value
    )
  }
  className="border border-gray-300 rounded-xl px-4 py-2 mt-4 w-48"
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