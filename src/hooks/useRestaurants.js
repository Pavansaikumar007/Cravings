import { useEffect, useState } from "react";
import { GET_SWIGGY_DATA_API } from "../../utils/constants";


const useRestaurants = (searchText) => {

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
    }, []);

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

    return {
        restaurantData,
        filteredRestaurants,
        isLoading,
        error,
        filters,
        toggleFilter
    }

}

export default useRestaurants;