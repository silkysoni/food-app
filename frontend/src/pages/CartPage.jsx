import React, { useEffect, useState } from "react";
import { selectTotalPrice } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";
import bag from "../images/bag.png";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import { placeOrderAsync } from "../features/orderSlice";
import "./pages.css";

function CartPage() {
  const cart = useSelector(selectCart);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckOut = () => {
    const items = cart.map((item) => ({
      id: item.id._id,
      quantity: item.quantity,
    }));
    dispatch(placeOrderAsync(items));
  };
  return (
    <>
      {cart?.length > 0 ? (
        <div className="mt-24">
          <div className="grid md:grid-cols-2 m-2">
            {cart.map((food, index) => (
              <div key={food.id._id}>
                <CartCard food={food} />
              </div>
            ))}
          </div>

          <div className="flex justify-end py-4 rounded w-full ">
            <div className=" w-80 items-center justify-between p-2 text-nowrap">
              <div className="text-md font-semibold">
                Total MRP ₹{totalPrice}
              </div>
              <button
                className="p-3 rounded-md transition duration-300 my-4 text-white text-xs font-semibold button"
                onClick={() => handleCheckOut()}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full height2 flex justify-center items-center">
          <div className="text-center">
            <img src={bag} alt="" className="h-72" />
            <p className="text-lg font-bold text-center">
              Hey,it feels so light!
            </p>
            <p className="text-sm text-center">
              There is nothing in you bag.Let's add some items.
            </p>
            <button
              className="py-2 px-3 rounded-md transition duration-300 my-4 text-xs font-semibold"
              style={{ border: "2px solid #E97451", color: "#E97451" }}
              onClick={() => navigate("/wishlist")}
            >
              ADD ITEMS FROM WISHLIST
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartPage;
