const logo = new URL("../assets/images/Cravings.png", import.meta.url)
// console.log(import.meta.url)

const Header = () => {
    return (
      <div className="flex justify-between items-center">
        <div>
          <img src={logo} alt="Logo" width="120" />
        </div>
        <div>
          <ul className="flex justify-center  gap-20">
            <li className="font-bold">Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Header;
  