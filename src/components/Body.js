import FoodCategoryCarousel from "./FoodCategoryCarousel";
import RestaurantCards from "./RestaurantCards";
import Shimmer from "./Shimmer";
import { useOutletContext, Link } from "react-router";
import useRestaurants from "/src/hooks/useRestaurants";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Body = () => {
    const { searchText } = useOutletContext();
    const {
        restaurantData, filteredRestaurants, isLoading, error, filters, toggleFilter
    } = useRestaurants(searchText);

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) {
        return <h1 className="font-extrabold align-middle text-2xl text-center ">Look's like you're offline!.Please Check Your Internet Connection!</h1>
    }

    return (
        <div>
            {/* Carousel should always render, and handle its own loading internally */}
            <FoodCategoryCarousel />

            {isLoading ? (
                <Shimmer />
            ) : error ? (
                <div className="text-center w-full mt-10 text-red-600">
                    <p>Error loading restaurants: {error}</p>
                    <p>Please check the console for more details or try again later.</p>
                    {/* Optionally add a retry button */}
                </div>
            ) : (
                <> {/* Correctly opened Fragment */}
                    {/* Filter Buttons */}
                    <div className="w-[80%] m-auto pt-8 flex gap-4 pb-5 border-b mb-4">
                        <button
                            className={`border-2 p-2 text-[14px] rounded-3xl shadow-sm font-semibold cursor-pointer ${filters.rating
                                ? "bg-gray-200"
                                : "border-gray-200 hover:bg-gray-100"
                                }`}
                            onClick={() => toggleFilter("rating")}
                        >
                            {filters.rating ? "✓  " : ""} Ratings 4.3+
                        </button>

                        <button
                            className={`border-2 p-2 text-[14px] rounded-3xl shadow-sm font-semibold cursor-pointer ${filters.fastDelivery
                                ? "bg-gray-200"
                                : "border-gray-200 hover:bg-gray-100"
                                }`}
                            onClick={() => toggleFilter("fastDelivery")}
                        >
                            {filters.fastDelivery ? "✓  " : ""} Fast Delivery
                        </button>
                    </div>

                    {/* Restaurant Cards */}
                    <div className="flex flex-wrap w-[80%] m-auto">
                        {restaurantData.length > 0 && filteredRestaurants.length === 0 ? (
                            <p className="text-center w-full mt-4 font-lg text-gray-600">
                                {searchText
                                    ? `No restaurants found matching "${searchText}" with the selected filters.`
                                    : "No restaurants match the selected filters."}
                            </p>
                        ) : restaurantData.length === 0 && !isLoading ? (
                            <p className="text-center w-full mt-4 font-lg text-gray-600">
                                No restaurants available in this area currently.
                            </p>
                        ) : (
                            filteredRestaurants.map((res) => (
                                <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
                                    <RestaurantCards resData={res} />
                                </Link>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );

}

export default Body;

