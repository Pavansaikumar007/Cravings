import { IMAGE_URL, GET_SWIGGY_DATA_API } from "../../utils/constants";
import { useState, useEffect, useRef } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ImageCardList from "./ImageCardList";


const FoodCategoryCarousel = () => {
    const [imageList, setImageList] = useState([]);
    const scrollRef = useRef(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch from the SAME proxy as Body.js
                const data = await fetch(GET_SWIGGY_DATA_API);
                const json = await data.json();

                const images =  json?.data?.cards[0]?.card?.card?.imageGridCards?.info || json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];
                setImageList(images)
            }
            catch (err) {
                console.log("Failed to fetch Data :", err)
            }
        }
        fetchImages();
    }, [])

    const handleScroll = (direction) => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -500 : 500,
            behaviour: "smooth",
        })
    }


    return (
        <div className="w-[80%] mx-auto py-4 pb-12 border-b-1 border-gray-200">
            <div className="flex justify-between mb-2">
                <p className=" font-black  text-[21px] ">What's on your Mind?</p>
                <div className="flex gap-6 mr-10">
                    <span onClick={() => handleScroll("left")} className="text-2xl cursor-pointer"><BiLeftArrow /></span>
                    <span onClick={() => handleScroll("right")} className="text-2xl cursor-pointer"><BiRightArrow /></span>
                </div>
            </div>
            <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar scroll-smooth">
                {imageList.map((item) => (
                    <ImageCardList
                        key={item.id}
                        image={IMAGE_URL + item.imageId}
                    />
                ))}
            </div>
        </div>
    )
}

export default FoodCategoryCarousel;