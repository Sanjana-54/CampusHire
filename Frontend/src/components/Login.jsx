import { useForm } from "react-hook-form";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router";

import { toast } from "react-hot-toast";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem("user")
);

useEffect(() => {

  if (user?.role === "student") {
    navigate("/student-dashboard");
  }

  if (user?.role === "admin") {
    navigate("/admin/dashboard");
  }

}, []);
  const [role, setRole] = useState("student");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onUserLogin = async (userCredObj) => {
try {


const loginData = {
  ...userCredObj,
  role,
};

const res = await axios.post(
  "https://campushire-pk1f.onrender.com/students/login",
  loginData,
  {
    withCredentials: true,
  }
);

const user = res.data.payload.user;

localStorage.setItem(
  "user",
  JSON.stringify(user)
);


toast.success("Login Successful");

if (user.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/student-dashboard");
}

} catch (err) {
toast.error(
err.response?.data?.message ||
"Login Failed"
);
}
};


  useEffect(() => {
  document.title = "CampusHire | Login";

}, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-8">
<div className="w-full max-w-6xl bg-white rounded-[32px] overflow-hidden shadow-lg grid lg:grid-cols-2 mt-6">
        {/* LEFT PANEL */}

        <div
          className="p-6 md:p-12 flex flex-col justify-center text-white"
          style={{
            background:
              "linear-gradient(135deg,#2D1B69 0%, #4C2F9E 100%)",
          }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-5">
            CampusHire
          </h1>

          <h2 className="text-2xl font-semibold mb-5">
            Smart Campus Placement Tracker
          </h2>

          <p className="text-lg leading-relaxed text-violet-100">
            Track applications, discover opportunities,
            monitor interview rounds and achieve your
            dream career.
          </p>
        </div>

        {/* RIGHT PANEL */}

        <div className="p-6 md:p-10 lg:p-14">

          
           <h2 className="text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "#111827" }}
          >
            Welcome Back
          </h2>

          <p
            className="text-lg mb-8"
            style={{ color: "#7A7A7A" }}
          >
            Sign in to continue
          </p>
          <div className="mb-5">
  <label className="block mb-2 font-medium">
    Login As
  </label>

<div className="relative">
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full border-2 rounded-xl px-5 py-3 pr-16 outline-none appearance-none bg-white"
  >
    <option value="student">Student</option>
    <option value="admin">Admin</option>
  </select>

  <span
    className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-bold pointer-events-none"
  >
    ▼
  </span>
</div>
  </div>
   

          <form
            className="space-y-5"
            onSubmit={handleSubmit(onUserLogin)}
          >

            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-2 rounded-xl px-5 py-3 outline-none"
                style={{
                  borderColor: "#E5E7EB",
                }}
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border-2 rounded-xl px-5 py-3 outline-none"
                style={{
                  borderColor: "#E5E7EB",
                }}
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white text-xl font-semibold py-3 rounded-xl transition-all"
              style={{
                background:
                  "linear-gradient(90deg,#4C2F9E 0%, #FF7043 100%)",
              }}
            >
              <p
  onClick={() => navigate("/forgot-password")}
  className="text-right mt-2 text-sm cursor-pointer"
  style={{ color: "#FF7043" }}
>
  Forgot Password?
</p>
              Login
            </button>

          </form>

          <p
            className="text-center mt-8"
            style={{ color: "#7A7A7A" }}
          >
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold"
              style={{ color: "#FF7043" }}
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