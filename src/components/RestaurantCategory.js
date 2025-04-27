import RestaurantItems from "./RestaurantItems";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const RestaurantCategory = ({ data, showItems, onClick }) => {
    // console.log("DATA:",data)


    return (
        <div >
            {/*Accordion Header*/}
            <div className="flex justify-between  my-4 py-4 cursor-pointer"
                onClick={onClick}
            >
                <span className="font-[800] text-[18px] ">{data?.title} ({data?.itemCards.length})</span>
                <span className=" text-2xl ">
                    {(showItems === true ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />)}
                </span>
            </div>
            {/* Accordion Body */}
            <div>
                {showItems && <RestaurantItems items={data?.itemCards} />}
            </div>
            <p className="border-b-10 border-[#F2F2F3]  "></p>
        </div>
    )
}

export default RestaurantCategory;