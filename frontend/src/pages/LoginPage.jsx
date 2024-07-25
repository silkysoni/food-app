import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import { selectLogIn } from "../features/userSlice";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLogIn);

  const dispatch = useDispatch();

  console.log("loggedIn in login ", loggedIn);
  if (loggedIn) {
    navigate("/", { replace: true });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAsync(formData));
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex height2 justify-center items-center px-5">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="border border-gray-400 shadow-lg w-96 max-w-full py-5 rounded-sm p-6 text-gray-700 bg-white overflow-auto"
      >
        <div className="flex items-center justify-center mb-3">
          <p className="text-2xl font-semibold my-3">Login</p>
        </div>

        <div className="w-full">
          <div className="md:mb-5 mb-2 rounded-md">
            <label className="text-md font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg mt-3"
              value={formData.email}
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <div className="mb-5 rounded-md">
            <label className="text-md font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg mt-3"
              value={formData.password}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white py-2 md:px-4 px-2 rounded-md transition duration-300 mt-2 text-md font-semibold w-full text-nowrap button"
        >
          Login
        </button>
        <div
          className="text-md font-semibold mt-4 cursor-pointer"
          onClick={() => navigate("/register")}
          style={{ color: "#E97451" }}
        >
          Create Account
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
