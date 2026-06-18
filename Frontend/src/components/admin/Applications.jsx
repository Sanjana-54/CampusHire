import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";

function Applications() {
  const [applications, setApplications] = useState([]);

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

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://campushire-pk1f.onrender.com/admin/update-status/${id}`,
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

  useEffect(() => {
    document.title = "CampusHire | Applications";
    getApplications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="md:ml-64 p-6">
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Applications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Student</th>
                  <th className="text-left py-3">Company</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Update</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-b">
                    <td className="py-3">
                      {app.studentId?.name}
                    </td>

                    <td>
                      {app.companyId?.companyName}
                    </td>

                    <td>{app.status}</td>

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
                        <option>Applied</option>
                        <option>Shortlisted</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Applications;