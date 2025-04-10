import { IMAGE_URL } from "../../utils/constants";
import { ImStarEmpty } from "react-icons/im";

const RestaurantCards = (props) => {
    const { resData } = props;

    const { name, cloudinaryImageId, avgRatingString, sla, cuisines, areaName } = resData?.info
    return (
        <div className="p-4.5 mt-8 hover:scale-95 transition-transform duration-300">
            <div>
                <img
                    className="w-[211px] h-[148px] object-cover rounded-2xl"
                    src={IMAGE_URL + cloudinaryImageId}
                />
            </div>
            <div className="pl-2 ">
                <p className="font-bold pt-2 text-lg">{name.length > 22 ? name.slice(0, 22) + "..." : name}</p>
                <p className=" flex items-center font-bold">
                    <span><ImStarEmpty className="mb-[2px] pr-1" /></span> {avgRatingString} {sla.slaString} </p>
                <p className="text-[#6D7073] "> {cuisines.join(",").length > 22 ? cuisines.join(",").slice(0, 22) + "..." : cuisines.join(",")}  </p>
                <p className="text-[#6D7073] "> {areaName} </p>
            </div>
        </div>
    )
}

export default RestaurantCards;