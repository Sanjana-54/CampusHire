import { useForm } from "react-hook-form";
import { useEffect} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onUserRegister = async (userData) => {

  try {
  const userDataWithRole = {
  ...userData,
  role: "admin"
};
    const res = await axios.post(
  "https://campushire-pk1f.onrender.com/students/register",
  userDataWithRole
);

    toast.success(res.data.message);

    navigate("/");

  } catch (err) {

    toast.error(
  err.response?.data?.error ||
  err.response?.data?.message ||
  "Registration Failed"
);

  }

};

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center px-6">

      <div className="w-full max-w-6xl bg-white rounded-[32px] overflow-hidden shadow-lg grid lg:grid-cols-2">

        {/* LEFT PANEL */}

        <div
          className="p-12 flex flex-col justify-center text-white"
          style={{
            background:
              "linear-gradient(135deg,#2D1B69 0%, #4C2F9E 100%)",
          }}
        >
          <h1 className="text-5xl font-bold mb-5">
            CampusHire
          </h1>

          <h2 className="text-2xl font-semibold mb-5">
            Start Your Placement Journey
          </h2>

          <p className="text-lg leading-relaxed text-violet-100">
            Register, apply for companies,
            track interviews and land your dream job.
          </p>
        </div>

        {/* RIGHT PANEL */}

        <div className="p-10 lg:p-14">

          <h2
            className="text-5xl font-bold mb-3"
            style={{ color: "#111827" }}
          >
            Create Account
          </h2>

          <p
            className="text-lg mb-8"
            style={{ color: "#7A7A7A" }}
          >
            Register to continue
          </p>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(onUserRegister)}
          >

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-2 rounded-xl px-5 py-3 outline-none"
              style={{ borderColor: "#E5E7EB" }}
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full border-2 rounded-xl px-5 py-3 outline-none"
              style={{ borderColor: "#E5E7EB" }}
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full border-2 rounded-xl px-5 py-3 outline-none"
              style={{ borderColor: "#E5E7EB" }}
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Branch"
              className="w-full border-2 rounded-xl px-5 py-3 outline-none"
              style={{ borderColor: "#E5E7EB" }}
              {...register("branch", {
                required: "Branch is required",
              })}
            />

            <input
              type="number"
              step="0.01"
              placeholder="CGPA"
              className="w-full border-2 rounded-xl px-5 py-3 outline-none"
              style={{ borderColor: "#E5E7EB" }}
              {...register("cgpa", {
                required: "CGPA is required",
              })}
            />

            <button
              type="submit"
              className="w-full text-white text-xl font-semibold py-3 rounded-xl"
              style={{
                background:
                  "linear-gradient(90deg,#4C2F9E 0%, #FF7043 100%)",
              }}
            >
              Register
            </button>

          </form>

          <p
            className="text-center mt-8"
            style={{ color: "#7A7A7A" }}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-semibold"
              style={{ color: "#FF7043" }}
            >
              Login
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;