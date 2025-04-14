import { PiHandbagBold } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { Link } from "react-router";

// console.log(import.meta.url)

const Header = ({ searchText, setSearchText }) => {
    const logo = new URL("../assets/images/Cravings_img.jpg", import.meta.url)

    const [loginBtn, setLoginBtn] = useState("Login");
    //console.log("Body Rendered")

    const handleInput = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <div className="flex justify-between items-center sticky top-0 z-30 bg-white shadow-lg" >
            <div>
                <img src={logo} alt="Logo" className="rounded-full m-2 ml-6 w-15 transition-transform duration-300 hover:scale-110 " />
            </div>

            <div className="relative flex items-center font-bold ">
                <LuSearch className="absolute left-2 text-lg cursor-pointer focus:font-light text-black "
                />
                <input
                    placeholder="Search"
                    className="pl-8 pr-4 py-2 rounded w-[300px] border-0 focus:font-light text-black cursor-pointer"
                    type="text"
                    value={searchText}
                    onChange={handleInput}
                />
            </div>

            <div className="flex">
                <ul className="flex justify-center  gap-20 mr-4">
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer"><Link to="/">Home</Link> </li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer"> <Link to="/aboutus">About Us</Link> </li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer">Instamart</li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer flex items-center gap-1"><PiHandbagBold />Cart</li>
                    <li className="font-semibold text-[16px] hover:text-[#F25206] cursor-pointer"
                        onClick={() => {
                            loginBtn === "Login" ? setLoginBtn("LogOut") : setLoginBtn("Login")
                        }}
                    >{loginBtn}</li>

                </ul>
            </div>
        </div>
    );
};

export default Header;
