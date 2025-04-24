import { IMAGE_URL } from "../../utils/constants";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ImageCardList from "./ImageCardList";
import useCarousel from "../hooks/useCarousel";

const FoodCategoryCarousel = () => {
    
    const { handleScroll, scrollRef, imageList } = useCarousel();

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