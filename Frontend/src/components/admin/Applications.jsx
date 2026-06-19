import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";

function Applications() {

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

const [statusFilter, setStatusFilter] =
  useState("All");

  const getApplications = async () => {

    try {

      const res = await axios.get(
        "https://campushire-pk1f.onrender.com/admin/applications",
        {
          withCredentials: true,
        }
      );

      setApplications(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };

  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      await axios.patch(
        `https://campushire-pk1f.onrender.com/admin/update-status/${applicationId}`,
        { status },
        {
          withCredentials: true,
        }
      );

      toast.success("Status Updated");

      getApplications();

    } catch (err) {

      toast.error("Update Failed");

      console.log(err);

    }

  };

  const updateRound = async (
    applicationId,
    round
  ) => {

    try {

      await axios.put(
        `https://campushire-pk1f.onrender.com/admin/application-round/${applicationId}`,
        { round },
        {
          withCredentials: true,
        }
      );

      toast.success("Round Updated");

      getApplications();

    } catch (err) {

      toast.error("Round Update Failed");

      console.log(err);

    }

  };

  useEffect(() => {

    document.title =
      "CampusHire | Applications";

    getApplications();

  }, []);

  const filteredApplications =
  applications.filter((app) => {

    const matchesSearch =
      app.studentId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      app.companyId?.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : app.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

  });
  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="md:ml-64 p-6">

        <div className="bg-white rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Applications
          </h2>

          <div className="flex gap-4 mb-6">

  <input
    type="text"
    placeholder="Search student or company..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="flex-1 border rounded-xl p-3 outline-none"
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="border rounded-xl px-4"
  >

    <option value="All">
      All Status
    </option>

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
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                 <th className="text-left py-3">Student</th>
                <th className="text-left py-3">Branch</th>
<th className="text-left py-3">CGPA</th>
<th className="text-left py-3">Company</th>
<th className="text-left py-3">Round</th>
<th className="text-left py-3">Status</th>
<th className="text-left py-3">Update Status</th>
<th className="text-left py-3">Update Round</th>

                </tr>

              </thead>

              <tbody>

                {filteredApplications.map((app) => (

                  <tr
                    key={app._id}
                    className="border-b"
                  >

                    <td className="py-3">
  {app.studentId?.name}
</td>

<td>
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
    {app.studentId?.branch}
  </span>
</td>

<td>
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
    {app.studentId?.cgpa}
  </span>
</td>

<td>
  {app.companyId?.companyName}
</td>

<td>
  {app.round}
</td>

<td>
  <span
    className="px-3 py-1 rounded-full text-white"
    style={{
      backgroundColor:
        app.status === "Applied"
          ? "#4C2F9E"
          : app.status === "Selected"
          ? "#22C55E"
          : app.status === "Rejected"
          ? "#EF4444"
          : "#FF7043"
    }}
  >
    {app.status}
  </span>
</td>

<td>

  <select
    value={app.status}
    onChange={(e) =>
      updateStatus(
        app._id,
        e.target.value
      )
    }
    className="border rounded-lg p-2"
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

</td>

<td>

  <select
    value={app.round}
    onChange={(e) =>
      updateRound(
        app._id,
        e.target.value
      )
    }
    className="border rounded-lg p-2"
  >
    <option value="Round 1">
      Round 1
    </option>

    <option value="Round 2">
      Round 2
    </option>

    <option value="Technical">
      Technical
    </option>

    <option value="HR">
      HR
    </option>

  </select>

</td>
                        
                  </tr>

                ))}

              </tbody>

            </table>

{filteredApplications.length === 0 && (

  <div className="text-center py-6 text-gray-500">

    No applications found

  </div>

)}
          </div>

        </div>

      </div>

    </div>

  );

}

export default Applications;