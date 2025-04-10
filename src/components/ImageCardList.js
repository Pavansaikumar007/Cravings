const ImageCardList = ({image}) => {
    return (
        <img
            src={image}
            alt="imageCategory"
            className="h-[180px] w-[144px] mr-6 cursor-pointer"
        />
    )
}

export default ImageCardList;