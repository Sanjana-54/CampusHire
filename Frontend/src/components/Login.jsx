
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onUserLogin = (userCredObj) => {
    console.log(userCredObj);

    toast.success("Login Successful");

    navigate("/student-dashboard");
  };

  useEffect(() => {
    document.title = "CampusHire | Login";
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
            Smart Campus Placement Tracker
          </h2>

          <p className="text-blue-100 leading-relaxed">
            Manage placements, track applications,
            monitor interview rounds and help students
            land their dream jobs.
          </p>

        </div>

        {/* Right Section */}
        <div className="p-10 lg:p-14">

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-500 mb-8">
            Sign in to continue
          </p>

          <form
            className="space-y-5"
            onSubmit={handleSubmit(onUserLogin)}
          >

            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600"
                {...register("email", {
                  required: "Email is required"
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600"
                {...register("password", {
                  required: "Password is required"
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>

          <p className="text-center text-slate-500 mt-8">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;

