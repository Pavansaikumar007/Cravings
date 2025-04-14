import { ShimmerThumbnail, ShimmerCircularImage, ShimmerSimpleGallery, ShimmerPostList } from "react-shimmer-effects"

const Shimmer = () => {
    return (
        <div>
            <div className="flex gap-6 mr-10 w-[80%] mx-auto py-4 pb-12 mt-10" >
                {Array.from({ length:6 }).map((_, index) => (
                    <ShimmerCircularImage key={index} size={120} />
                ))}
            </div>
            <div className="w-[80%]  rounded-2xl m-auto " >
                <ShimmerPostList postStyle="STYLE_FIVE" col={4} row={4} gap={30}  />
            </div>
        </div>
    )
}

export default Shimmer;