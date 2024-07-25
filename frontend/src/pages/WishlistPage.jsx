import React, { useEffect } from "react";
import {
  getWishlistAsync,
  removeItemFromWhishlistAsync,
  selectWishlistItems,
} from "../features/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../features/cartSlice";
import { IoCloseOutline } from "react-icons/io5";
import wish from "../images/wish.jpeg";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWishlistAsync());
    console.log("wishlist refreshed");
  }, []);

  const handleAddToCart = (id) => {
    const quantity = 1;
    const items = { id, quantity };
    dispatch(addToCartAsync(items));
    dispatch(removeItemFromWhishlistAsync(id));
  };
  const removeFromWishlist = async (id) => {
    await dispatch(removeItemFromWhishlistAsync(id));
    dispatch(getWishlistAsync());
  };

  return (
    <>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 margin-top">
          {wishlistItems.map((filteredItem) => (
            <div key={filteredItem._id} className="">
              <div className="flex justify-evenly items-center max-h-[500px] min-w-[200px] select-none mx-8">
                <div className="card mb-6 mt-4 shadow-lg rounded-sm overflow-hidden w-full ">
                  <div className="relative w-full h-48">
                    <img
                      src={filteredItem.id.img}
                      className="w-full h-48 object-cover"
                      alt={filteredItem.id.name}
                    />
                    <div className="absolute top-0 right-0 rounded-full bg-white bg-opacity-60 m-2 p-1">
                      <IoCloseOutline
                        size={20}
                        onClick={() => removeFromWishlist(filteredItem.id._id)}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2 text-nowrap">
                      {filteredItem.id.name}
                    </h5>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-lg font-semibold mb-2">
                        ₹{filteredItem.id.price}
                      </div>
                      <button
                        className="text-white py-2 px-4 rounded-md transition duration-300 button"
                        onClick={() => handleAddToCart(filteredItem.id._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-screen justify-center overflow-hidden height2">
          <div className="flex flex-col justify-center items-center h-full">
            <p className="font-bold text-sm">YOUR WISHLIST IS EMPTY...</p>
            <p>Add item that you like to your wishlist.</p>
            <p>Review them anytime and easily move them to bag.</p>
            <img src={wish} alt="" className="h-40 mx-auto my-3" />
            <button
              className="py-2 px-3 rounded-md transition duration-300 text-xs font-semibold"
              style={{ border: "2px solid #E97451", color: "#E97451" }}
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WishlistPage;
