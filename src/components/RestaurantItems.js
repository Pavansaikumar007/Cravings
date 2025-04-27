import { IMAGE_URL } from "../../utils/constants";
import { TiStar } from "react-icons/ti";

const RestaurantItems = ({ items }) => {
    // console.log("ITEMS", items)
    return (
        <div>
            {items?.map((item) => (
                <div key={item?.card?.info?.id} className="flex justify-between h-full mb-[25px] my-2 border-b-2 border-b-[#D3D3D3] pb-12">
                    <div className="w-[552px]">
                        <p className="font-[800] text-[18px] text-[#414449]">{item?.card?.info?.name}</p>
                        <p className=" text-[16px] font-[700]">₹{item?.card?.info?.price / 100 || item?.card?.info?.finalPrice / 100}</p>
                        <div className=" text-[13px] text-[#116649] font-[700] pt-4 flex flex-row ">
                        <span className=" text-lg ">
                            <TiStar />
                        </span>
                            {
                                (item?.card?.info?.ratings?.aggregatedRating?.rating != null &&
                                    item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 != null) && (
                                    <p className=" text-[13px] text-[#116649] font-[700] ">
                                        {item.card.info.ratings.aggregatedRating.rating} ({item.card.info.ratings.aggregatedRating.ratingCountV2})
                                    </p>
                                )
                            }
                        </div>
                        <p className=" text-[16px] text-[#676A6D] pt-2 max-w-[552px] overflow-hidden">
                            {item?.card?.info?.description && item?.card?.info?.description.length > 120 ? item?.card?.info?.description.slice(0, 130) + "..." : item?.card?.info?.description}</p>
                    </div>
                    <div className="relative w-[156px]">
                        <img className="h-[144px] object-cover rounded-lg w-full" src={IMAGE_URL + item?.card?.info?.imageId} />
                        <button className="absolute -bottom-4 bg-white w-[120px] ml-4.5  h-[39px] shadow-lg rounded-lg font-[700] text-[#1BA672] border-1 border-gray-200 cursor-pointer hover:bg-[#D9DADB]" >ADD</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RestaurantItems;