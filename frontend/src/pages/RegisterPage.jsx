import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAsync, selectRegistered } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../features/toastSlice";
import "./pages.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const isRegistered = useSelector(selectRegistered);
  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length !== 10) {
      return false;
    }
    const digitRegex = /^\d{10}$/;
    return digitRegex.test(phoneNumber);
  };
  if (isRegistered) {
    navigate("/login", { replace: true });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.phone
      ) {
        dispatch(
          showToast({
            status: "error",
            message: "All fields are required!",
          })
        );
        return;
      } else if (!validatePhoneNumber(formData.phone)) {
        console.log("Invalid phone number");
        dispatch(
          showToast({
            status: "error",
            message: "Contact number must have 10 digits!",
          })
        );

        return;
      }
      console.log(formData);
      const result = await dispatch(registerAsync(formData));
    } catch (error) {
      console.log("error in registering user", error);
    }
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex w-screen height2 justify-center items-center px-5">
      <form
        onSubmit={(e) => handleSubmit(e)}
        autoComplete="off"
        className="border border-gray-400 shadow-lg w-96 py-5 rounded-sm p-6 text-gray-700"
      >
        <div className="flex items-center justify-center mb-3">
          <p
            className="text-2xl font-semibold my-3"
            style={{ color: "#E97451" }}
          >
            Register
          </p>
        </div>

        <div className="w-full">
          <div className="mb-3 rounded-md">
            <label className="text-md font-medium ">Username</label>
            <input
              type="text"
              name="username"
              className="w-full border p-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg mt-3"
              value={formData.username}
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <div className="mb-3 rounded-md">
            <label className="text-md font-medium ">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg mt-3"
              value={formData.email}
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <div className="mb-3 rounded-md">
            <label className="text-md font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg mt-3"
              value={formData.password}
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <div className="mb-3 rounded-md">
            <label className="text-md font-medium">Contact</label>
            <input
              type="text"
              name="phone"
              className="w-full border p-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg mt-3"
              value={formData.phone}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white py-2 md:px-4 px-2 rounded-md transition duration-300 mt-2 text-md font-semibold w-full text-nowrap button"
        >
          Register
        </button>
        <div
          className="text-md font-semibold mt-4 cursor-pointer"
          onClick={() => navigate("/login")}
          style={{ color: "#E97451" }}
        >
          Already an user
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
