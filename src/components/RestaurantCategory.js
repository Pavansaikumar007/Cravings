import RestaurantItems from "./RestaurantItems";
import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const RestaurantCategory = (data) => {
    // console.log("DATA:",data)

    const [showItems, setShowItems] = useState(true);
    //toggle feature
    const handleClick = () => {
        setShowItems(!showItems);
    }

    return (
        <div >
            {/*Accordion Header*/}
            <div className="flex justify-between  my-4 py-4 cursor-pointer"
                onClick={handleClick}
            >
                <span className="font-[800] text-[18px] ">{data?.data?.title} ({data?.data?.itemCards.length})</span>
                <span className=" text-2xl ">
                    {(showItems === true ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />)}
                </span>
            </div>
            {/* Accordion Body */}
            <div>
                {showItems && <RestaurantItems items={data?.data?.itemCards} />}
            </div>
            <p className="border-b-10 border-[#F2F2F3]  "></p>
        </div>
    )
}

export default RestaurantCategory;