const logo = new URL("../assets/images/Cravings_img.jpg", import.meta.url)
import { PiHandbagBold } from "react-icons/pi";
// console.log(import.meta.url)

const Header = () => {
    return (
        <div className="flex justify-between items-center sticky top-0 z-30 bg-white shadow-md">
            <div>
                <img src={logo} alt="Logo" width="120" className="rounded-full m-2 w-18 transition-transform duration-300 hover:scale-110 " />
            </div>
            <div>
                <ul className="flex justify-center  gap-20 mr-4">
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer">Home</li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer">About Us</li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer">Contact Us</li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer flex items-center gap-1"><PiHandbagBold />Cart</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
