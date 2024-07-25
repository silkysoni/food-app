import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoodItemsAsync,
  selectFoodItems,
  selectFoodCategories,
  fetchFoodCategoriesAsync,
  selectSearch,
} from "../features/foodSlice";
import "./pages.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const foodItems = useSelector(selectFoodItems);
  const foodCategories = useSelector(selectFoodCategories);
  const searchFood = useSelector(selectSearch);

  useEffect(() => {
    dispatch(fetchFoodItemsAsync());
    dispatch(fetchFoodCategoriesAsync());
    setLoading(false);
  }, []);

  const filteredCategories = foodCategories.map((data) => {
    const filteredItems = foodItems.filter(
      (item) =>
        item.CategoryName === data.CategoryName &&
        item.name.toLowerCase().includes(searchFood.toLowerCase())
    );

    return {
      ...data,
      items: filteredItems,
    };
  });

  const hasResults = filteredCategories.some(
    (category) => category.items.length > 0
  );

  return (
    <>
      <div className="w-full">
        <div className="overflow-x-hidden w-full">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-2xl my-3 text-center">
                <Skeleton />
              </div>
            ) : (
              <>
                {hasResults ? (
                  filteredCategories.map(
                    (data) =>
                      data.items.length > 0 && (
                        <div className="mb-3" key={data._id}>
                          <div className="text-xl my-3 mx-6 font-semibold">
                            {data.CategoryName}
                          </div>
                          <hr className="mx-6" />
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data.items.map((filteredItem) => (
                              <div key={filteredItem._id}>
                                <Card
                                  foodItem={filteredItem}
                                  price={filteredItem.price}
                                  imgSrc={filteredItem.img}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="w-full height flex justify-center items-center text-2xl font-semibold">
                    No results found!
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
