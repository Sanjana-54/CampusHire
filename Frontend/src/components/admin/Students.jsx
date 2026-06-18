import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Students() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const res = await axios.get(
        "https://campushire-pk1f.onrender.com/admin/students",
        {
          withCredentials: true,
        }
      );

      setStudents(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = "CampusHire | Students";
    getStudents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="md:ml-64 p-6">
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Students
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Branch</th>
                  <th className="text-left py-3">CGPA</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="py-3">{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.branch}</td>
                    <td>{student.cgpa}</td>
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

export default Students;