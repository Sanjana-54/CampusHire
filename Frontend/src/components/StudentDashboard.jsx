import { useEffect } from "react";
import { useNavigate } from "react-router";


function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CampusHire | Dashboard";
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Welcome Section */}
      
      <div
        className="rounded-3xl p-8 text-white mb-8"
        style={{
          background:
            "linear-gradient(135deg,#2D1B69 0%, #4C2F9E 100%)",
        }}
      >
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 👋
        </h1>
         <div className="flex gap-4 mt-5">

  <button
    onClick={() => navigate("/companies")}
    className="px-5 py-3 rounded-xl text-white font-semibold"
    style={{
      background:
        "linear-gradient(90deg,#4C2F9E,#FF7043)",
    }}
  >
    View Companies
  </button>

  <button
    onClick={() => navigate("/applications")}
    className="px-5 py-3 rounded-xl font-semibold"
    style={{
      backgroundColor: "#FFF3F0",
      color: "#FF7043",
    }}
  >
    My Applications
  </button>

</div>
        <p className="text-violet-100">
          Track your placements and applications.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-gray-500 mb-2">
            Eligible Companies
          </h3>

          <p
            className="text-4xl font-bold"
            style={{ color: "#2D1B69" }}
          >
            5
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-gray-500 mb-2">
            Applications
          </h3>

          <p
            className="text-4xl font-bold"
            style={{ color: "#2D1B69" }}
          >
            2
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-gray-500 mb-2">
            Selected
          </h3>

          <p
            className="text-4xl font-bold"
            style={{ color: "#FF7043" }}
          >
            1
          </p>
        </div>

      </div>

      {/* Eligible Companies */}

      <div className="mb-8">

        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "#2D1B69" }}
        >
          Eligible Companies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              TCS
            </h3>

            <p className="text-gray-500 mb-3">
              Package: 7 LPA
            </p>

            <button
              className="px-5 py-2 rounded-xl text-white"
              style={{
                backgroundColor: "#FF7043",
              }}
            >
              Apply
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Infosys
            </h3>

            <p className="text-gray-500 mb-3">
              Package: 8 LPA
            </p>

            <button
              className="px-5 py-2 rounded-xl text-white"
              style={{
                backgroundColor: "#FF7043",
              }}
            >
              Apply
            </button>
          </div>

        </div>

      </div>

      {/* Applications */}

      <div>

        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "#2D1B69" }}
        >
          Recent Applications
        </h2>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between mb-4">

            <div>
              <h3 className="font-semibold">
                TCS
              </h3>

              <p className="text-gray-500 text-sm">
                Applied on 05 June
              </p>
            </div>

            <span
              className="px-4 py-2 rounded-full text-white text-sm"
              style={{
                backgroundColor: "#4C2F9E",
              }}
            >
              Applied
            </span>

          </div>

          <div className="flex justify-between">

            <div>
              <h3 className="font-semibold">
                Infosys
              </h3>

              <p className="text-gray-500 text-sm">
                Applied on 03 June
              </p>
            </div>

            <span
              className="px-4 py-2 rounded-full text-white text-sm"
              style={{
                backgroundColor: "#FF7043",
              }}
            >
              Shortlisted
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;