import React from "react";

function Skeleton() {
  let row = [1, 2];
  let column = [3, 4, 5, 6];
  return (
    <>
      <div className="md:px-6 px-2 md:block">
        <div className="bg-gray-200 h-8 w-1/5 rounded"></div>
        {row.map((i) => (
          <div
            className="md:grid  md:grid-cols-4 md:gap-20 hidden h-[400px]"
            key={i}
          >
            {column.map((j) => (
              <div
                className="card mt-3 shadow-lg rounded-lg overflow-hidden w-full animate-pulse bg-gray-200 min-h-60 min-w-40 "
                key={j}
              >
                <div className="w-full h-48 rounded-md"></div>
                <div className="p-4">
                  <div className="w-full h-6 bg-gray-300 mb-2 rounded-md"></div>

                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-gray-300 h-8 w-14 rounded-md"></div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div className="bg-gray-300 h-10 w-1/2 mb-2 rounded-md "></div>
                    <div className="bg-gray-300 text-white h-10 w-10 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <div className="card mt-3 shadow-lg rounded-lg overflow-hidden w-full animate-pulse bg-gray-200 min-h-60 md:hidden">
          <div className="w-full h-48 rounded-md"></div>
          <div className="p-4">
            <div className="w-full h-6 bg-gray-300 mb-2 rounded-md"></div>

            <div className="flex justify-between items-center mb-2">
              <div className="bg-gray-300 h-8 w-14 rounded-md"></div>
            </div>

            <div className="flex justify-between mt-2">
              <div className="bg-gray-300 h-10 w-1/2 mb-2 rounded-md "></div>
              <div className="bg-gray-300 text-white h-10 w-10 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="card mt-3 shadow-lg rounded-lg overflow-hidden w-full animate-pulse bg-gray-200 min-h-60 md:hidden">
          <div className="w-full h-48 rounded-md"></div>
          <div className="p-4">
            <div className="w-full h-6 bg-gray-300 mb-2 rounded-md"></div>

            <div className="flex justify-between items-center mb-2">
              <div className="bg-gray-300 h-8 w-14 rounded-md"></div>
            </div>

            <div className="flex justify-between mt-2">
              <div className="bg-gray-300 h-10 w-1/2 mb-2 rounded-md "></div>
              <div className="bg-gray-300 text-white h-10 w-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skeleton;
