import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const resetPassword = async () => {

    try {

      await axios.post(
        "https://campushire-pk1f.onrender.com/students/forgot-password",
        { email }
      );

      toast.success("Password reset request submitted");

    } catch (err) {

      toast.error("User not found");

    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-5">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-xl w-full mb-4"
        />

        <button
          onClick={resetPassword}
          className="w-full text-white py-3 rounded-xl"
          style={{
            background:
              "linear-gradient(90deg,#4C2F9E,#FF7043)"
          }}
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;