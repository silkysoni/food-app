import React, { useState, useEffect } from "react";
import { selectLogIn } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAsync } from "../features/cartSlice";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  getWishlistAsync,
  selectWishlistItems,
} from "../features/wishlistSlice";
import {
  addItemToWishlistAsync,
  removeItemFromWhishlistAsync,
} from "../features/wishlistSlice";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLogIn);
  const wishlistItems = useSelector(selectWishlistItems);
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      if (wishlistItems?.length > 0) {
        setIsClicked(
          wishlistItems.some((item) => item.id._id === props.foodItem._id)
        );
      }
    }
  }, [props.foodItem._id]);

  useEffect(() => {
    dispatch(getWishlistAsync());
  }, [dispatch]);

  const addToWishlist = (id) => {
    dispatch(addItemToWishlistAsync(id));
    setIsClicked(true);
  };

  const removeFromWishlist = (id) => {
    dispatch(removeItemFromWhishlistAsync(id));
    setIsClicked(false);
  };

  const handleAddToCart = (id) => {
    if (loggedIn) {
      const quantity = 1;
      const items = { id, quantity };
      dispatch(addToCartAsync(items));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center max-h-[500px] min-w-[200px] select-none mx-8">
        <div className="card mb-6 mt-4 shadow-lg rounded-sm overflow-hidden w-full ">
          <img
            src={props.foodItem.img}
            className="w-full h-48 object-cover"
            alt={props.foodItem.name}
          />
          <div className="p-4">
            <h5 className="text-lg font-semibold text-nowrap">
              {props.foodItem.name}
            </h5>
            <p className="mb-2 text-lg font-semibold">
              ₹{props.foodItem.price}
            </p>

            <div className="flex justify-between items-center ">
              <div className="flex justify-center">
                <button
                  className="py-2 px-3 rounded-md transition duration-300 my-4 text-white text-xs font-semibold button"
                  onClick={() => handleAddToCart(props.foodItem._id)}
                >
                  ADD TO CART
                </button>
              </div>
              <div style={{ cursor: "pointer" }}>
                {loggedIn ? (
                  <>
                    {isClicked ? (
                      <IoMdHeart
                        onClick={() => removeFromWishlist(props.foodItem._id)}
                        size={25}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <IoMdHeartEmpty
                        onClick={() => addToWishlist(props.foodItem._id)}
                        size={25}
                        style={{ color: "black" }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <IoMdHeartEmpty
                      size={25}
                      className="text-gray-400 cursor-not-allowed"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
