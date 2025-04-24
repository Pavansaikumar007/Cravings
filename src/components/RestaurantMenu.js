import useRestaurantMenu from "../hooks/useRestaurantMenu";
import Shimmer from "./Shimmer"
import { useParams } from "react-router";


const RestaurantMenu = () => {

    const { resId } = useParams();
    // console.log(resId);

    const restaurantDishes = useRestaurantMenu(resId);

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