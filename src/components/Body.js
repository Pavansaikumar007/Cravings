import { IMAGE_URL } from "../../utils/constants";
import { SWIGGY_URL } from "../../utils/constants";
import { useState, useEffect } from "react";

const Body = () => {

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await fetch(SWIGGY_URL);
                const json = await data.json();
                const images = json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];
                setImageList(images)
            }
            catch(err){
                console.log("Failed to fetch Data :", err)
            }
        }
        fetchImages();
    },[])



    return (
        <div>
            <div>
                <p>What's on your Mind</p>
            </div>
            <div>
            {imageList.map((item)=> (
                <img 
                src={IMAGE_URL + item.imageId}
                key={item.id}
                />
            ))}
            </div>
        </div>
    )
}

export default Body;