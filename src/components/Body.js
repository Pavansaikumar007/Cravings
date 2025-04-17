// --- START OF MODIFIED FILE Body.js ---

import { useEffect, useState } from "react";
// Import the constants we defined/updated
// *** Make sure this path is correct for your project structure ***
import { GET_SWIGGY_DATA_API } from "/utils/constants";
import FoodCategoryCarousel from "./FoodCategoryCarousel";
import RestaurantCards from "./RestaurantCards";
import Shimmer from "./Shimmer";
// *** Make sure you import from react-router-dom if using v6+ ***
import { useOutletContext, Link } from "react-router";

const Body = () => {
    //useOutletContext for Router.
    const { searchText } = useOutletContext();
    //main Data
    const [restaurantData, setRestaurantData] = useState([]);
    //filtered Data
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    // *** ADD THESE STATE DECLARATIONS ***
    // Loading state - Initialize to true because we fetch immediately
    const [isLoading, setIsLoading] = useState(true);
    // Error state - Initialize to null (no error initially)
    const [error, setError] = useState(null);

    //Scalabe Filters State Object
    const [filters, setFilters] = useState({
        rating: false,
        fastDelivery: false,
        //add more filters here
    });

    //fetch all restaurants data once
    useEffect(() => {
        const fetchData = async () => {
            // *** Now setIsLoading and setError are defined ***
            setIsLoading(true); // Start loading
            setError(null); // Reset error state

            try {
                // Construct the URL for YOUR proxy API endpoint.
                const proxyUrl = GET_SWIGGY_DATA_API; // Use the constant

                // Log the URL being fetched (useful for debugging)
                console.log("Fetching data from proxy:", proxyUrl);

                // Fetch data FROM YOUR PROXY endpoint, NOT directly from Swiggy
                const response = await fetch(proxyUrl);

                // Log the proxy response status
                console.log("Proxy response status:", response.status, response.ok);

                // ADDED ERROR HANDLING for the fetch response
                if (!response.ok) {
                    let errorDetails = `HTTP error! Status: ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorDetails += `, Message: ${errorData.error || 'Unknown proxy error'}`;
                    } catch (e) {
                        errorDetails += ` - ${response.statusText}`;
                    }
                    throw new Error(errorDetails);
                }

                // Parse the JSON data received FROM YOUR PROXY
                const json = await response.json();

                // IMPORTANT: Check the structure of the data *returned by Swiggy*
                const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
                    json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
                    json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
                    json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
                    [];

                // console.log("Restaurants data received:", restaurants);

                if (restaurants.length === 0 && !error) { // Avoid warning if there was already an error
                    console.warn("Received data from proxy, but no restaurants found in the expected structure. Check Swiggy's API response format.");
                }

                setRestaurantData(restaurants);
                setFilteredRestaurants(restaurants);

            } catch (err) {
                // Catch errors from the fetch call OR the !response.ok check
                console.error("Fetch Data Failed:", err); // Log the actual error
                // *** Now setError is defined ***
                setError(err.message || "Failed to fetch data. Please try again later.");
                setRestaurantData([]);
                setFilteredRestaurants([]);
            } finally {
                // *** Now setIsLoading is defined ***
                setIsLoading(false); // Stop loading, whether success or error
            }
        };

        fetchData();
    }, []); // Run only once on component mount

    // --- (applyFilters, useEffect for filters, toggleFilter remain the same) ---
    // filter logic to apply all filters
    const applyFilters = () => {
        let results = [...restaurantData]; // Start with full data if available

        // Check if restaurantData is actually an array before filtering
        if (!Array.isArray(results)) {
            console.warn("applyFilters called but restaurantData is not an array.");
            results = []; // Ensure results is an array
        }


        if (searchText) {
            results = results.filter((res) =>
                res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (filters.rating) {
            results = results.filter((res) => parseFloat(res?.info?.avgRatingString) > 4.3);
        }

        if (filters.fastDelivery) {
            results = results.filter((res) => res?.info?.sla?.deliveryTime < 25);
        }

        setFilteredRestaurants(results);
    };

    // Apply filters whenever searchText or filter toggles
    useEffect(() => {
        // Ensure restaurantData is available and is an array before applying filters
        if (restaurantData && Array.isArray(restaurantData) && restaurantData.length > 0) {
            applyFilters();
        } else {
            // If no data (e.g., initial load, error), ensure filtered list is empty
            setFilteredRestaurants([]);
        }
    }, [searchText, filters, restaurantData]);

    // Toggle individual filters
    const toggleFilter = (key) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    // *** UPDATED RENDER LOGIC to handle Loading and Error states ***

    // Show Shimmer component while loading
    if (isLoading) {
        return <Shimmer />;
    }

    // Show error message if fetch failed
    if (error) {
        return (
            <div className="text-center w-full mt-10 text-red-600">
                <p>Error loading restaurants: {error}</p>
                <p>Please check the console for more details or try again later.</p>
                {/* Optionally add a retry button */}
            </div>
        );
    }

    // --- (Rest of the return statement remains the same, but uses the filteredRestaurants correctly) ---
    // Show main content only after loading is complete and there's no error
    return (
        <div>
            {/* Conditionally render Carousel only if needed */}
            <FoodCategoryCarousel />
            <div className="w-[80%] m-auto pt-8 flex gap-4 pb-5 border-b mb-4"> {/* Added border and margin */}
                <button
                    className={`border-2 p-2 text-[14px] rounded-3xl shadow-sm font-semibold cursor-pointer ${filters.rating ? "bg-gray-200" : "border-gray-200 hover:bg-gray-100" // Added hover
                        }`}
                    onClick={() => toggleFilter("rating")}
                >
                    {filters.rating ? "✓  " : ""} Ratings 4.3+
                </button>

                <button
                    className={`border-2 p-2 text-[14px] rounded-3xl shadow-sm font-semibold cursor-pointer ${filters.fastDelivery ? "bg-gray-200" : "border-gray-200 hover:bg-gray-100" // Added hover
                        }`}
                    onClick={() => toggleFilter("fastDelivery")}
                >
                    {filters.fastDelivery ? "✓  " : ""} Fast Delivery
                </button>
            </div>

            <div className="flex flex-wrap w-[80%] m-auto">
                {/* Check filteredRestaurants specifically for the "not found" message */}
                {/* Also check if original data exists, otherwise show 'No restaurants available' */}
                {restaurantData.length > 0 && filteredRestaurants.length === 0 ? (
                    <p className="text-center w-full mt-4 font-lg text-gray-600">
                        {searchText
                            ? `No restaurants found matching "${searchText}" with the selected filters.`
                            : "No restaurants match the selected filters."}
                    </p>
                ) : restaurantData.length === 0 && !isLoading ? ( // Handle case where initial fetch yielded no data
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
        </div>
    );
};

export default Body;

// --- END OF MODIFIED FILE Body.js ---