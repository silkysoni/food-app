import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserPasswordAsync,
  logOut,
  selectUser,
  editUserDetailsAsync,
} from "../features/userSlice";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import { showToast } from "../features/toastSlice";

function DashboardPage() {
  const userDetails = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [data, setData] = useState({
    password: "",
    newpassword: "",
  });
  const [user, setUser] = useState(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    setIsEditPassword((prev) => !prev);
  };

  const handleEditPassword = () => {
    setIsEditPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onchangePassword = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitPassword = () => {
    dispatch(editUserPasswordAsync(data));
    setData({ password: "", newpassword: "" });
  };

  const submitDetails = () => {
    dispatch(editUserDetailsAsync(user));
  };

  const handleSave = () => {
    submitPassword();
    submitDetails();
    handleEdit();
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(showToast({ status: "success", message: "User LoggedOut!" }));
    navigate("/");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-center items-center w-full height2">
        <div className="border border-gray-300 mx-auto md:w-1/2 h-fit shadow-lg rounded-sm p-4 min-w-80">
          <h1 className="text-xl font-semibold m-3">User Dashboard</h1>
          <hr />

          <div className="my-2">
            <label className="text-md font-medium my-2">Username</label>
            <div
              className={`border border-gray-300 rounded-sm p-2 w-full ${
                isEditing ? "shadow-md" : ""
              }`}
            >
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                />
              ) : (
                <span>{user.username}</span>
              )}
            </div>
          </div>

          <div className="my-2">
            <label className="text-md font-medium my-2">Email</label>
            <div
              className={`border border-gray-300 rounded-sm p-2 w-full ${
                isEditing ? "shadow-md" : ""
              }`}
            >
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="focus:outline-none w-full"
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
          </div>
          <div className="my-2">
            <label className="text-md font-medium my-2">Phone Number</label>
            <div
              className={`border border-gray-300 rounded-sm w-full p-2 ${
                isEditing ? "shadow-md" : ""
              }`}
            >
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="focus:outline-none w-full"
                />
              ) : (
                <span>{user.phone}</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-md font-medium my-2">Password</label>
            <div
              className={`md:flex md:justify-between sm:block border border-gray-300 rounded-sm ${
                isEditing ? "border-none" : ""
              }`}
            >
              {isEditing ? (
                <>
                  <div className="md:flex sm:block">
                    <label className="text-md font-medium my-2 mr-2">
                      Current
                    </label>
                    <div
                      className={`flex border border-gray-300 rounded-sm w-full p-2 ${
                        isEditing ? "shadow-md" : ""
                      }`}
                    >
                      <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => onchangePassword(e)}
                        className="focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="md:flex sm:block">
                    <label className="text-md font-medium my-2 mr-2">New</label>
                    <div
                      className={`border border-gray-300 rounded-sm p-2 w-full ${
                        isEditing ? "shadow-md" : ""
                      }`}
                    >
                      <input
                        type="password"
                        name="newpassword"
                        value={data.newpassword}
                        onChange={(e) => onchangePassword(e)}
                        className="focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="justify-start p-3">
                  <HiOutlineDotsHorizontal />
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={handleSave}
              className="text-white py-2 px-4 rounded-md transition duration-300 mt-2 text-xs font-semibold md:w-28 w-24 button"
            >
              SAVE
            </button>
          )}
          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                handleEdit();
                handleEditPassword();
              }}
              className="text-white py-2 md:px-4 px-2 rounded-md transition duration-300 mt-2 text-xs font-semibold md:w-28 w-24 button"
            >
              EDIT
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/order")}
            className="text-white py-2 md:px-4 px-2 rounded-md transition duration-300 mt-2 text-xs font-semibold mx-2 md:w-28 w-24 text-nowrap button"
          >
            PAST ORDERS
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="text-white py-2 md:px-4 px-2 rounded-md transition duration-300 mt-2 text-xs font-semibold mx-2 md:w-28 w-24 button"
          >
            Logout
          </button>
        </div>
      </div>
    </form>
  );
}

export default DashboardPage;
