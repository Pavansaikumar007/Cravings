import useRestaurantMenu from "../hooks/useRestaurantMenu";
import Shimmer from "./Shimmer"
import { useParams } from "react-router";
import RestaurantCategory from "./RestaurantCategory";
import { MdStars } from "react-icons/md";


const RestaurantMenu = () => {

    const { resId } = useParams();
    // console.log(resId);

    const restaurantDishes = useRestaurantMenu(resId);

    if (restaurantDishes === null) return <Shimmer />

    const { name, avgRatingString, totalRatingsString, costForTwo, cuisines } = restaurantDishes?.cards[2]?.card?.card?.info || {};

    const categories = restaurantDishes?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    // console.log(categories)


    return (
        <div className="w-8/12 m-auto ">
            <div className=" border-2 border-gray-100 rounded-2xl mt-10 shadow-lg" >
                <p className="font-[800] text-[28px] p-1 pl-2 ">{name}</p>
                <p className=" font-[700] p-1 pl-2 flex"> 
                    <span className="text-2xl  pr-1 text-[#FF5200]"><MdStars /></span>
                     {avgRatingString} ({totalRatingsString}) • ₹{costForTwo / 100} for two</p>
                <p className=" text-[#FF5200] underline font-[700] cursor-pointer p-1 pl-2 ">
                    {cuisines.join(", ")}</p>
            </div>
            <div>
                {categories.map((category) => (
                    <RestaurantCategory key={category?.card?.card?.title}
                        data={category?.card?.card} />
                ))}
            </div>
        </div>
    )
}

export default RestaurantMenu;