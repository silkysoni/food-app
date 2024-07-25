import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCartAsync,
  deleteItemInCartAsync,
  decreaseQuantity,
  increaseQuantity,
} from "../features/cartSlice";

import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

function CartCard({ food }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteItemInCartAsync(id));
    dispatch(fetchCartAsync());
  };

  const increaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseQty = (id) => {
    if (food.quantity > 1) {
      dispatch(decreaseQuantity(id));
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-1 h-[150px] min-w-[200px] col-span-1 ">
        <div className="flex">
          <div className="w-1/3 h-[150px]">
            <img src={food.id.img} className="w-full h-full object-cover" />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-xl font-semibold mb-2">{food.id.name}</h3>
            <p className="text-gray-700 text-md font-bold mt-2">
              ₹{food.quantity * food.id.price}
            </p>
            <div className="text-gray-700 ">
              <div className="p-0 flex items-center">
                <MdOutlineArrowDropDown
                  className="m-0 p-0"
                  onClick={() => decreaseQty(food.id._id)}
                />
                {food.quantity}
                <MdOutlineArrowDropUp
                  className="m-0 p-0"
                  onClick={() => increaseQty(food.id._id)}
                />
              </div>
            </div>
          </div>
          <div className="m-2 rounded-full  p-1 h-7 font-bold">
            <IoCloseCircleOutline
              size={25}
              onClick={() => handleDelete(food.id._id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
