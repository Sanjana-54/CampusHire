import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-hot-toast";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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

  const deleteStudent = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this student?"
    );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `https://campushire-pk1f.onrender.com/students/${id}`,
      {
        withCredentials: true,
  }
      
    );

    setStudents(
  students.filter(
    (student) =>
      student._id !== id
  )
);

toast.success(
  "Student deleted successfully");

  } catch (err) {

    console.log(err);
    toast.error(
    "Failed to delete student");

  }

};
  useEffect(() => {
    document.title = "CampusHire | Students";
    getStudents();
  }, []);

  const filteredStudents = students.filter(
  (student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    student.email
      .toLowerCase()
      .includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="md:ml-64 p-6">
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Students
          </h2>
          <div className="mb-6">
  <input
    type="text"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full border rounded-xl p-3 outline-none"
  />
</div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Branch</th>
                  <th className="text-left py-3">CGPA</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="py-3">{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.branch}</td>
                    <td>{student.cgpa}</td>
                    <td>
<button
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
  onClick={() =>
    deleteStudent(student._id)
  }
>
  Delete
</button>

</td>
                  </tr>
                ))}
              </tbody>
              {filteredStudents.length === 0 && (
  <tr>
    <td
      colSpan="5"
      className="text-center py-6 text-gray-500"
    >
      No students found
    </td>
  </tr>
)}
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Students;