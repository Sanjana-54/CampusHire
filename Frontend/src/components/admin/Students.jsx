import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-hot-toast";

function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] =
  useState("high");
  const [selectedStudent, setSelectedStudent] =
    useState(null);

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
        "Student deleted successfully"
      );

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to delete student"
      );

    }

  };

  useEffect(() => {

    document.title =
      "CampusHire | Students";

    getStudents();

  }, []);

  const filteredStudents =
    students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
const sortedStudents =
  [...filteredStudents].sort((a, b) =>
    sortOrder === "high"
      ? b.cgpa - a.cgpa
      : a.cgpa - b.cgpa
  );
  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="md:ml-64 p-6">

        <div className="bg-white rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Students
          </h2>
        
      <p
  className="mb-5 font-medium"
  style={{ color: "#4C2F9E" }}
>
  Total Students: {filteredStudents.length}
</p>
          <div className="flex gap-4 mb-6">

  <input
    type="text"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="flex-1 border-2 border-violet-200 rounded-xl p-3 outline-none focus:border-violet-500"
  />

  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(e.target.value)
    }
    className="border rounded-xl px-4"
  >
    <option value="high">
      CGPA High → Low
    </option>

    <option value="low">
      CGPA Low → High
    </option>

  </select>

</div>
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
  className="border-b"
  style={{ color: "#2D1B69" }}
>

                  <th className="text-left py-3">
                    Name
                  </th>

                  <th className="text-left py-3">
                    Email
                  </th>

                  <th className="text-left py-3">
                    Branch
                  </th>

                  <th className="text-left py-3">
                    CGPA
                  </th>

                  <th className="text-left py-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {sortedStudents.map(
                  (student) => (

                   <tr
  key={student._id}
  className="border-b hover:bg-violet-50 transition"
>

                      <td className="py-3">

  <div className="flex items-center gap-3">

    <div
      className="
      w-10
      h-10
      rounded-full
      bg-gradient-to-r from-indigo-500 to-purple-500
      text-white
      flex
      items-center
      justify-center
      font-bold"
    >
      {student.name
        ?.charAt(0)
        .toUpperCase()}
    </div>

    <span>
      {student.name}
    </span>

  </div>

</td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.branch}
                      </td>

                      <td>
                        {student.cgpa}
                      </td>

                      <td className="space-x-2">

                        <button
 className="text-white px-3 py-1 rounded-lg transition"
style={{
  background: "#4C2F9E"
}}
 onClick={() =>
                            setSelectedStudent(
                              student
                            )
                          }
                        >
                          View
                        </button>

                        <button
                         className="text-white px-3 py-1 rounded-lg transition"
style={{
  background: "#FF7043"
}}
                         onClick={() =>
                            deleteStudent(
                              student._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            {filteredStudents.length === 0 && (

              <div className="text-center py-6 text-gray-500">

                No students found

              </div>

            )}

          </div>

        </div>

      </div>

      {selectedStudent && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[400px]">

            <h2 className="text-2xl font-bold mb-4">
              Student Details
            </h2>

            <div className="space-y-3 text-slate-700">

  <p>
    <strong>Name:</strong> {selectedStudent.name}
  </p>

  <p>
    <strong>Email:</strong> {selectedStudent.email}
  </p>

  <p>
    <strong>Branch:</strong> {selectedStudent.branch}
  </p>

  <p>
    <strong>CGPA:</strong> {selectedStudent.cgpa}
  </p>

  <p>
    <strong>Role:</strong> {selectedStudent.role}
  </p>

</div>

            <button
             className="mt-5 text-white px-4 py-2 rounded-lg"
style={{
  background:
    "linear-gradient(90deg,#4C2F9E,#FF7043)"
}}
             onClick={() =>
                setSelectedStudent(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Students;