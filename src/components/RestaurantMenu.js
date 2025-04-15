import { MENU_ITEMS_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer"
import { useParams } from "react-router";


const RestaurantMenu = () => {

    const [restaurantDishes, setRestaurantDishes] = useState(null);

    const { resId } = useParams();
    // console.log(resId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(MENU_ITEMS_URL + resId);
                const json = await data.json();
                setRestaurantDishes(json?.data);

            }
            catch (err) {
                console.log("Data Fetching Failed:", err);
            }
        }
        fetchData();
    }, [])


    if (restaurantDishes === null) return <Shimmer />

    const { name, avgRatingString, totalRatingsString, costForTwo, cuisines } = restaurantDishes?.cards[2]?.card?.card?.info || {};


    const { itemCards } = restaurantDishes?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || restaurantDishes?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2 ]?.card?.card || [];
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