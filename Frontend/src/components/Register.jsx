import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onUserRegister = (userData) => {

    console.log(userData);

    toast.success("Registration Successful");

    navigate("/");
  };

  useEffect(() => {
    document.title = "CampusHire | Register";
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}
        <div className="bg-blue-600 text-white p-12 flex flex-col justify-center">

          <h1 className="text-5xl font-bold mb-4">
            CampusHire
          </h1>

          <h2 className="text-2xl font-semibold mb-6">
            Join the Placement Portal
          </h2>

          <p className="text-blue-100 leading-relaxed">
            Register yourself, explore opportunities,
            apply for companies and track your placement journey.
          </p>

        </div>

        {/* Right Section */}
        <div className="p-10 lg:p-14">

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Create Account
          </h2>

          <p className="text-slate-500 mb-8">
            Register to get started
          </p>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(onUserRegister)}
          >

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              {...register("name", {
                required: "Name is required"
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              {...register("email", {
                required: "Email is required"
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
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              {...register("password", {
                required: "Password is required"
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Branch (CSE, IT, ECE...)"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              {...register("branch", {
                required: "Branch is required"
              })}
            />

            <input
              type="number"
              step="0.01"
              placeholder="CGPA"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              {...register("cgpa", {
                required: "CGPA is required"
              })}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Register
            </button>

          </form>

          <p className="text-center text-slate-500 mt-8">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 font-medium hover:underline"
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