import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router";

import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
} from "../styles/common";

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //submit form
  const onSubmit = async (userObj) => {
    //check passwords
    if (userObj.newPassword !== userObj.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    //api call
    let res = await axios.put(
    "https://campushire-pk1f.onrender.com/students/forgot-password",
      {
        email: userObj.email,
        newPassword: userObj.newPassword,
      }
    );

    //success
    if (res.status === 200) {
      toast.success("Password updated successfully");
      navigate("/");
    }
  };

  return (
    <div
      className={`${pageBackground} flex items-center justify-center py-16 px-4`}
    >
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className={inputClass}
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className={formGroup}>
            <label className={labelClass}>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              className={inputClass}
              {...register("newPassword", {
                required: "New password is required",
              })}
            />

            {errors.newPassword && (
              <p className={errorClass}>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className={formGroup}>
            <label className={labelClass}>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              className={inputClass}
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />

            {errors.confirmPassword && (
              <p className={errorClass}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={submitBtn}>
            Reset Password
          </button>
        </form>

        {/* Footer */}
        <p className={`${mutedText} text-center mt-5`}>
          Back to{" "}
          <NavLink to="/" className={linkClass}>
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;