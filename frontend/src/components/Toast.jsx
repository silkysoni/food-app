import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  hideToast,
  selectMessage,
  selectShow,
  selectStatus,
} from "../features/toastSlice";

function Toast() {
  const open = useSelector(selectShow);
  const message = useSelector(selectMessage);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [open, dispatch]);

  return (
    <>
      {open && (
        <div className="fixed md:top-24 top-36 left-1/2 transform -translate-x-1/2 w-fit p-4 text-black bg-white border border-gray-400 font-bold rounded-lg shadow-xl z-50 flex items-center">
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
              status === "success"
                ? "text-green-500 bg-green-100"
                : "text-red-500 bg-red-100"
            }`}
          >
            {status === "success" ? <FaCheck /> : <IoCloseSharp />}
          </div>
          <div className="ms-3 text-sm font-semibold">{message}</div>
        </div>
      )}
    </>
  );
}

export default Toast;
