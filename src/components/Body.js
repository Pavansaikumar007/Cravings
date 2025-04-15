import { useEffect, useState } from "react";
import { SWIGGY_URL, IMAGE_URL } from "/utils/constants";
import FoodCategoryCarousel from "./FoodCategoryCarousel";
import RestaurantCards from "./RestaurantCards";
import Shimmer from "./Shimmer";
import { useOutletContext } from "react-router";
import { Link } from "react-router";

const Body = () => {
    //useOutletContext for Router.
    const { searchText } = useOutletContext();
    //main Data
    const [restaurantData, setRestaurantData] = useState([]);
    //filtered Data
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    //Scalabe Filters State Object
    const [filters, setFilters] = useState({
        rating: false,
        fastDelivery: false,
        //add more filters here
    });

    //fetch all restaurants data once

    useEffect(() => {
        const fetchData = async () => {
            try {
                //await new Promise((resolve) => setTimeout(resolve, 2000));
                const data = await fetch(SWIGGY_URL);
                const json = await data.json();
                const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                //console.log(restaurants)
                setRestaurantData(restaurants);
                setFilteredRestaurants(restaurants);
            }
            catch (err) {
                console.log("Fetch Data Failed :", err)
            }
        }
        fetchData();
    }, [])

    //filter logic to apply all filters
    const applyFilters = () => {
        let results = [...restaurantData]

        if (searchText) {
            results = results.filter((res) =>
                res?.info?.name?.toLowerCase().includes(searchText.toLowerCase()))
        }

        if (filters.rating) {
            results = results.filter((res) => parseFloat(res?.info?.avgRatingString) > 4.3);
        }

        if (filters.fastDelivery) {
            results = results.filter((res) => res?.info?.sla?.deliveryTime < 25);
        }

        setFilteredRestaurants(results);

    }

    //apply filters whenever searchText or filter toggles

    useEffect(() => {
        applyFilters();
    }, [searchText, filters, restaurantData])

    // Toggle individual filters

    const toggleFilter = (key) => {
        setFilters((prev) => ({
            ...prev, [key]: !prev[key]
        }));
    }

    return restaurantData.length === 0 ? (<Shimmer />) : (
        <div>
            <div><FoodCategoryCarousel /></div>
            <div className="w-[80%] m-auto pt-8 flex gap-4 pb-5 ">
                <button
                    className={`border-2 p-2 text-[14px] rounded-3xl shadow-sm font-semibold cursor-pointer ${filters.rating ? "bg-gray-200" : "border-gray-200"
                        }`}
                    onClick={() => toggleFilter("rating")}
                > {filters.rating ? "✓  " : ""} Ratings 4.3+</button>

                <button className={`border-2 p-2 text-[14px] rounded-3xl shadow-sm font-semibold cursor-pointer ${filters.fastDelivery ? "bg-gray-200" : "border-gray-200"
                    }`}
                    onClick={() => toggleFilter("fastDelivery")}
                > {filters.fastDelivery ? "✓  " : ""} Fast Delivery</button>
            </div>

            <div className="flex flex-wrap w-[80%] m-auto">
                {/* ✅ Render filtered restaurants, not full data */}
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((res) => (
                        // we should always keep our key inside the parent level element.
                        <Link key={res.info.id}
                        to={"/restaurants/" + res.info.id}
                        >
                            <RestaurantCards resData={res}  />
                        </Link>
                    ))
                ) : (
                    <p className="text-center w-full mt-4 font-lg text-gray-600">
                        No restaurants found for “{searchText}”
                    </p>
                )}
            </div>


        </div>
    )
}


export default Body;