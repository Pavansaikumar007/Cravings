import { GET_MENU_API_BASE, LATITUDE, LONGITUDE } from "../../utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer"
import { useParams } from "react-router";


const RestaurantMenu = () => {

    const [restaurantDishes, setRestaurantDishes] = useState(null);

    const { resId } = useParams();
    // console.log(resId);

    useEffect(() => {
        const fetchData = async () => {
            // Added check: Don't fetch if resId isn't available yet
            if (!resId) {
                console.log("Restaurant ID not found yet, skipping fetch.");
                return;
            }
            // Optional: Add loading/error state like in Body.js for better UX
            // setRestaurantDishes(null); // Reset state on fetch

            try {
                // *** CHANGE THIS BLOCK ***
                // Construct the URL to YOUR menu proxy, passing parameters
                const menuProxyUrl = `${GET_MENU_API_BASE}?resId=${resId}&lat=${LATITUDE}&lng=${LONGITUDE}`;

                console.log("Fetching menu via proxy:", menuProxyUrl); // Log the URL

                const data = await fetch(menuProxyUrl); // Fetch from YOUR proxy

                // Add error handling for the proxy response itself
                if (!data.ok) {
                    let errorDetails = `Menu Proxy Error! Status: ${data.status}`;
                    try { const errorJson = await data.json(); errorDetails += `, Message: ${errorJson.error || 'Unknown proxy error'}`; } catch (e) { errorDetails += ` - ${data.statusText}`; }
                    throw new Error(errorDetails);
                }

                const json = await data.json();
                setRestaurantDishes(json?.data); // Keep this line

            } catch (err) {
                console.error("Data Fetching Failed:", err); // Use console.error
                // Optionally set an error state here to show in the UI
            }
        }
        fetchData();
        // Add resId as a dependency to refetch if the ID changes
    }, [resId])

    if (restaurantDishes === null) return <Shimmer />

    const { name, avgRatingString, totalRatingsString, costForTwo, cuisines } = restaurantDishes?.cards[2]?.card?.card?.info || {};


    const { itemCards } = restaurantDishes?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || restaurantDishes?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || [];
    //console.log("itemCategories", itemCards)


    return (
        <div>
            <div>
                <p className="font-extrabold text-2xl">{name}</p>
                <p>{avgRatingString} ({totalRatingsString}) • {costForTwo}</p>
                <p>{cuisines}</p>
            </div>
            {itemCards.map((categories) => (
                <div key={categories?.card?.info?.id}>
                    <p>{categories?.card?.info?.name}</p>
                </div>
            ))}

        </div>
    )
}

export default RestaurantMenu;