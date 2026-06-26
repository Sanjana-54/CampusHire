import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import StudentSidebar from "./StudentSidebar";

function InterviewExperiences() {

  const [experiences, setExperiences] = useState([]);

  const [companies, setCompanies] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    role: "",
    rounds: [],
    difficulty: "Medium",
    experience: "",
    tips: ""
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const getExperiences = async () => {

    try {

      const res = await axios.get(
        "https://campushire-pk1f.onrender.com/students/interview-experiences",
        {
          withCredentials: true
        }
      );

      setExperiences(res.data.payload);

    } catch (err) {

      console.log(err);

    }

  };

  const getAppliedCompanies = async () => {

    try {

      const res = await axios.get(
        `https://campushire-pk1f.onrender.com/students/applications/${user._id}`,
        {
          withCredentials: true
        }
      );

      const appliedCompanies =
        res.data.payload.map(
          app => app.companyId
        );

      setCompanies(appliedCompanies);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getExperiences();

    getAppliedCompanies();

  }, []);

  const handleRoundChange = (round) => {

    if (
      formData.rounds.includes(round)
    ) {

      setFormData({

        ...formData,

        rounds:
          formData.rounds.filter(
            r => r !== round
          )

      });

    }

    else {

      setFormData({

        ...formData,

        rounds: [
          ...formData.rounds,
          round
        ]

      });

    }

  };

  const shareExperience = async () => {

    try {

      await axios.post(

        "https://campushire-pk1f.onrender.com/students/interview-experience",

        {

          ...formData,

          studentId: user._id,

          rounds:
            formData.rounds.join(", ")

        },

        {

          withCredentials: true

        }

      );

      toast.success(
        "Experience Shared Successfully"
      );

      setFormData({

        companyId: "",

        companyName: "",

        role: "",

        rounds: [],

        difficulty: "Medium",

        experience: "",

        tips: ""

      });

      getExperiences();

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Unable to Share"

      );

    }

  };

  const filtered =

    experiences.filter(exp =>

      exp.companyName

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  return (

    <div className="min-h-screen bg-slate-100">

      <StudentSidebar />

      <div className="md:ml-64 p-6">

        <div className="bg-white rounded-3xl p-6 mb-8">

          <h1 className="text-3xl font-bold mb-6">

            Share Interview Experience

          </h1>

          <div className="grid md:grid-cols-2 gap-4">

            <select
            required


              className="border rounded-xl p-3"

              value={formData.companyId}

              
             onChange={(e) => {

  const company = companies.find(
    c => c._id === e.target.value
  );

  if (!company) return;

  setFormData({
    ...formData,
    companyId: company._id,
    companyName: company.companyName
  });

}} 

            >

              <option value="" disabled>
  Select Company
</option>
              {

                companies.map(company => (

                  <option

                    key={company._id}

                    value={company._id}

                  >

                    {company.companyName}

                  </option>

                ))

              }

            </select>

            <input

              placeholder="Role"

              className="border rounded-xl p-3"

              value={formData.role}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  role:e.target.value

                })

              }

            />

            <select

              className="border rounded-xl p-3"

              value={formData.difficulty}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  difficulty:e.target.value

                })

              }

            >

              <option>Easy</option>

              <option>Medium</option>

              <option>Hard</option>

            </select>

          </div>

          <div className="mt-6">

            <p className="font-semibold mb-3">

              Interview Rounds

            </p>

            <div className="grid grid-cols-2 gap-3">

              {

                [

                  "Aptitude",

                  "Coding",

                  "Technical",

                  "HR"

                ].map(round=>(

                  <label

                    key={round}

                    className="flex items-center gap-2"

                  >

                    <input

                      type="checkbox"

                      checked={

                        formData.rounds.includes(

                          round

                        )

                      }

                      onChange={()=>

                        handleRoundChange(

                          round

                        )

                      }

                    />

                    {round}

                  </label>

                ))

              }

            </div>

          </div>

          <textarea

            rows="5"

            placeholder="Interview Questions Asked / Experience"

            className="border rounded-xl p-3 w-full mt-5"

            value={formData.experience}

            onChange={(e)=>

              setFormData({

                ...formData,

                experience:e.target.value

              })

            }

          />

          <textarea

            rows="4"

            placeholder="Preparation Tips For Juniors"

            className="border rounded-xl p-3 w-full mt-5"

            value={formData.tips}

            onChange={(e)=>

              setFormData({

                ...formData,

                tips:e.target.value

              })

            }

          />

          <button

            onClick={shareExperience}

            className="mt-6 px-6 py-3 rounded-xl text-white"

            style={{

              background:

              "linear-gradient(90deg,#4C2F9E,#FF7043)"

            }}

          >

            Share Experience

          </button>

        </div>

        <div className="bg-white rounded-3xl p-6">

          <h1 className="text-3xl font-bold mb-5">

            Interview Experiences

          </h1>

          <input

            placeholder="Search Company..."

            className="border rounded-xl p-3 w-full mb-6"

            value={search}

            onChange={(e)=>

              setSearch(e.target.value)

            }

          />

          <div className="space-y-5">

                      {filtered.map((exp) => (

              <div
                key={exp._id}
                className="border rounded-2xl p-6 hover:shadow-lg transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2
                      className="text-2xl font-bold"
                      style={{ color: "#2D1B69" }}
                    >
                      {exp.companyName}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {exp.role}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-white font-medium
                    ${
                      exp.difficulty === "Easy"
                        ? "bg-green-500"
                        : exp.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {exp.difficulty}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="font-semibold">
                    🎯 Interview Rounds
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {exp.rounds
                      ?.split(",")
                      .map((round) => (

                        <span
                          key={round}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                        >
                          {round}
                        </span>

                      ))}

                  </div>

                </div>

                <div className="mt-5">

                  <p className="font-semibold">
                    ❓ Interview Questions Asked / Experience
                  </p>

                  <p className="text-slate-600 mt-2 whitespace-pre-wrap">
                    {exp.experience}
                  </p>

                </div>

                <div className="mt-5">

                  <p className="font-semibold">
                    💡 Preparation Tips
                  </p>

                  <p className="text-slate-600 mt-2 whitespace-pre-wrap">
                    {exp.tips}
                  </p>

                </div>

                <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-t pt-4">

                  <span>
                    👤 Shared by {exp.studentId?.name}
                  </span>

                  <span>
                    📅 {new Date(exp.createdAt).toLocaleDateString()}
                  </span>

                </div>

              </div>

            ))}

            {filtered.length === 0 && (

              <div className="text-center text-gray-500 py-8">

                No interview experiences found.

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default InterviewExperiences;