import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import food from "../images/food1.jpg";
import { SlUser } from "react-icons/sl";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiHandbagSimple } from "react-icons/pi";
import "./Components.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../features/cartSlice";
import { BsSearch } from "react-icons/bs";
import { selectSearch, setSearch } from "../features/foodSlice";
import "./Components.css";
import { NavLink } from "react-router-dom";
import { selectLogIn } from "../features/userSlice";
import "./Components.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const searchFood = useSelector(selectSearch);
  const [isFocused, setIsFocused] = useState(false);
  const loggedIn = useSelector(selectLogIn);

  return (
    <>
      <div className="md:flex block select-none">
        <div className="flex justify-between w-full items-center p-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={food} alt="" className="h-16" />
            <div className="text-2xl text-gray-800 font-semibold ml-4 hidden sm:block">
              Go Food
            </div>
          </div>
          <div
            className={`md:flex justify-center rounded w-1/3 hidden  ${
              isFocused
                ? "bg-white border border-gray-200"
                : " bg-gray-100 border border-gray-100"
            }`}
          >
            <div className="flex justify-start items-center w-full p-2">
              <BsSearch className="text-gray-500" />
              <input
                type="search"
                className="form-control text-sm font-medium w-full focus:outline-none px-4 bg-gray-100 focus:bg-white h-full"
                placeholder="Search"
                aria-label="Search"
                value={searchFood}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                onFocus={() => (setIsFocused(true), navigate("/"))}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>
          <div className="flex md:gap-10 gap-5">
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? "active-link" : ""} `
              }
              onClick={(e) => {
                if (!loggedIn) {
                  e.preventDefault();
                }
              }}
              style={{
                cursor: !loggedIn ? "not-allowed" : "pointer",
                opacity: !loggedIn ? 0.5 : 1,
              }}
            >
              <IoMdHeartEmpty size={25} />
              <p className="text-xs text-center mt-1 font-semibold">
                <span>Wishlist</span>
              </p>
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? "active-link" : ""}`
              }
              onClick={(e) => {
                if (!loggedIn) {
                  e.preventDefault();
                }
              }}
              style={{
                cursor: !loggedIn ? "not-allowed" : "pointer",
                opacity: !loggedIn ? 0.5 : 1,
              }}
            >
              <SlUser size={25} />
              <p className="text-xs text-center mt-1 font-semibold">
                <span>Profile</span>
              </p>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? "active-link" : ""}`
              }
              onClick={(e) => {
                if (!loggedIn) {
                  e.preventDefault();
                }
              }}
              style={{
                cursor: !loggedIn ? "not-allowed" : "pointer",
                opacity: !loggedIn ? 0.5 : 1,
              }}
            >
              <div>
                <PiHandbagSimple size={25} />
                <p className="text-xs text-center mt-1 font-semibold">
                  <span>Bag</span>
                </p>
              </div>
              {loggedIn && (
                <div className="absolute top-2 right-9 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold nav-badge-bg">
                  {cart?.length > 0 ? cart.length : 0}
                </div>
              )}
            </NavLink>
          </div>
        </div>
        <div
          className={`justify-center rounded w-full my-2 md:hidden  ${
            isFocused
              ? "bg-white border border-gray-200"
              : " bg-gray-100 border border-gray-100"
          }`}
        >
          <div className="flex justify-start items-center w-full p-2">
            <BsSearch className="text-gray-500" />
            <input
              type="search"
              className="form-control text-sm font-medium w-full focus:outline-none px-4 bg-gray-100 focus:bg-white h-full"
              placeholder="Search"
              aria-label="Search"
              value={searchFood}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              onFocus={() => (setIsFocused(true), navigate("/"))}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
