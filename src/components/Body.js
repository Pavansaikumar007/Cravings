import { useEffect, useState } from "react";
import { SWIGGY_URL, IMAGE_URL } from "/utils/constants";
import FoodCategoryCarousel from "./FoodCategoryCarousel";
import RestaurantCards from "./RestaurantCards";

const Body = () => {

    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(SWIGGY_URL);
                const json = await data.json();
                const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                console.log(restaurants)
                setRestaurantData(restaurants);
            }
            catch (err) {
                console.log("Fetch Data Failed :", err)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
             <div><FoodCategoryCarousel/></div>
             <div className="w-[80%] m-auto pt-8 ">
                <button className="border-2 p-2 text-[14px] rounded-3xl border-gray-200 shadow-sm cursor-pointer">Ratings 4.0+</button>
                <button className="border-2 p-2 text-[14px] rounded-3xl border-gray-200 shadow-sm cursor-pointer">Ratings 4.0+</button>
            </div>

            <div className="flex flex-wrap w-[80%] m-auto h-[239px]">
                {restaurantData.map((res) => (
                    <RestaurantCards resData={res} key={res.info.id}/>
                ))}
            </div>
        </div>
    )
}


export default Body;