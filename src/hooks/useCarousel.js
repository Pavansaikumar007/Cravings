import { useState, useEffect, useRef } from "react";
import { GET_SWIGGY_DATA_API} from "/utils/constants"

const useCarousel = () => {
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

    return { imageList, scrollRef, handleScroll}
}

export default useCarousel;