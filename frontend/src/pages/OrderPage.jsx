import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersAsync, selectOrders } from "../features/orderSlice";
import box from "../images/orderbox.png";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function OrderPage() {
  const orderedItems = useSelector(selectOrders);
  console.log("orderedItems ", orderedItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrdersAsync());
    console.log("ordered items ", orderedItems);
  }, []);

  return (
    <>
      {orderedItems.length > 0 ? (
        <div className="text-lg font-semibold text-center py-5">All Orders</div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-6">
        {orderedItems.length > 0 ? (
          orderedItems.map((filteredItem) => (
            <div key={filteredItem._id} className="">
              <div className="flex justify-evenly items-center max-h-[500px] min-w-[200px] select-none mx-8">
                <div className="card mb-6 mt-4 shadow-lg rounded-sm overflow-hidden w-full ">
                  <img
                    src={filteredItem.id.img}
                    className="w-full h-48 object-cover"
                    alt={filteredItem.id.name}
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-nowrap">
                      {filteredItem.id.name}
                    </h5>
                    <div className="flex justify-between items-center">
                      <p className="my-2 text-lg ">
                        Quantity <b>{filteredItem.quantity}</b>
                      </p>
                      <p className="text-lg font-semibold">
                        ₹{filteredItem.id.price}
                      </p>
                    </div>
                    <p className="text-lg ">
                      Order placed on{" "}
                      <b>
                        {new Date(filteredItem.date).toLocaleDateString(
                          "en-GB"
                        )}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-col height overflow-hidden w-screen ">
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center">
                <img src={box} alt="box-image" className="h-40 mx-auto my-3" />
                <p className="font-bold text-sm">
                  You haven't placed any order yet...
                </p>
                <p>
                  Order section is empty. After placing order you can track them
                  from here!
                </p>
                <button
                  className="py-2 px-3 rounded-md transition duration-300 text-xs font-semibold my-2"
                  style={{ border: "2px solid #E97451", color: "#E97451" }}
                  onClick={() => navigate("/")}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderPage;
