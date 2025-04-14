import { IMAGE_URL } from "../../utils/constants";
import { ImStarEmpty } from "react-icons/im";

const RestaurantCards = (props) => {
    const { resData } = props;

    const { name, cloudinaryImageId, avgRatingString, sla, cuisines, areaName, aggregatedDiscountInfoV3 } = resData?.info

    return (
        <div className="p-3.5 hover:scale-95 transition-transform duration-300 cursor-pointer">
            <div className="relative w-fit">
                <img
                    className="w-[222px] h-[148px] object-cover rounded-2xl "
                    src={IMAGE_URL + cloudinaryImageId}
                />
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/100 to-transparent rounded-b-2xl "
                ></div>
                <div >
                {(aggregatedDiscountInfoV3?.header || aggregatedDiscountInfoV3?.subHeader) && (
                    <p className="text-white font-[1000] text-[18px] z-10 absolute bottom-2 left-2">
                        {`${aggregatedDiscountInfoV3?.header ?? ""} ${aggregatedDiscountInfoV3?.subHeader ?? ""}`.trim()}
                    </p>
                )}
                </div>
            </div>
            <div className="pl-2 ">
                <p className="font-bold pt-2 text-lg">{name.length > 20 ? name.slice(0, 20) + "..." : name}</p>
                <p className=" flex items-center font-bold">
                    <span><ImStarEmpty className="mb-[2px] pr-1" /></span> {avgRatingString} {sla.slaString} </p>
                <p className="text-[#6D7073] "> {cuisines.join(",").length > 22 ? cuisines.join(",").slice(0, 22) + "..." : cuisines.join(",")}  </p>
                <p className="text-[#6D7073] "> {areaName} </p>
            </div>
        </div >
    )
}

export default RestaurantCards;